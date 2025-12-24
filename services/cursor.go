package services

import (
	"context"
	"cursor2api-go/config"
	"cursor2api-go/middleware"
	"cursor2api-go/models"
	"cursor2api-go/utils"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/http/cookiejar"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/imroc/req/v3"
	"github.com/sirupsen/logrus"
)

const cursorAPIURL = "https://cursor.com/api/chat"

// CursorService handles interactions with Cursor API.
type CursorService struct {
	config          *config.Config
	client          *req.Client
	mainJS          string
	envJS           string
	scriptCache     string
	scriptCacheTime time.Time
	scriptMutex     sync.RWMutex
}

// NewCursorService creates a new service instance.
func NewCursorService(cfg *config.Config) *CursorService {
	mainJS, err := os.ReadFile(filepath.Join("jscode", "main.js"))
	if err != nil {
		logrus.Fatalf("failed to read jscode/main.js: %v", err)
	}

	envJS, err := os.ReadFile(filepath.Join("jscode", "env.js"))
	if err != nil {
		logrus.Fatalf("failed to read jscode/env.js: %v", err)
	}

	jar, err := cookiejar.New(nil)
	if err != nil {
		logrus.Warnf("failed to create cookie jar: %v", err)
	}

	client := req.C()
	client.SetTimeout(time.Duration(cfg.Timeout) * time.Second)
	client.ImpersonateChrome()
	if jar != nil {
		client.SetCookieJar(jar)
	}

	return &CursorService{
		config: cfg,
		client: client,
		mainJS: string(mainJS),
		envJS:  string(envJS),
	}
}

// ChatCompletion creates a chat completion stream for the given request.
func (s *CursorService) ChatCompletion(ctx context.Context, request *models.ChatCompletionRequest) (<-chan interface{}, error) {
	truncatedMessages := s.truncateMessages(request.Messages)
	cursorMessages := models.ToCursorMessages(truncatedMessages, s.config.SystemPromptInject)

	payload := models.CursorRequest{
		Context:  []interface{}{},
		Model:    request.Model,
		ID:       utils.GenerateRandomString(16),
		Messages: cursorMessages,
		Trigger:  "submit-message",
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal cursor payload: %w", err)
	}

	xIsHuman, err := s.fetchXIsHuman(ctx)
	if err != nil {
		return nil, err
	}

	// 添加详细的调试日志
	headers := s.chatHeaders(xIsHuman)
	logrus.WithFields(logrus.Fields{
		"url":            cursorAPIURL,
		"x-is-human":     xIsHuman[:50] + "...", // 只显示前50个字符
		"payload_length": len(jsonPayload),
		"model":          request.Model,
	}).Debug("Sending request to Cursor API")

	resp, err := s.client.R().
		SetContext(ctx).
		SetHeaders(headers).
		SetBody(jsonPayload).
		DisableAutoReadResponse().
		Post(cursorAPIURL)
	if err != nil {
		return nil, fmt.Errorf("cursor request failed: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Response.Body)
		resp.Response.Body.Close()
		message := strings.TrimSpace(string(body))

		// 记录详细的错误信息
		logrus.WithFields(logrus.Fields{
			"status_code": resp.StatusCode,
			"response":    message,
			"headers":     resp.Header,
		}).Error("Cursor API returned non-OK status")
		if strings.Contains(message, "Attention Required! | Cloudflare") {
			message = "Cloudflare 403"
		}
		return nil, middleware.NewCursorWebError(resp.StatusCode, message)
	}

	output := make(chan interface{}, 32)
	go s.consumeSSE(ctx, resp.Response, output)
	return output, nil
}

func (s *CursorService) consumeSSE(ctx context.Context, resp *http.Response, output chan interface{}) {
	defer close(output)

	if err := utils.ReadSSEStream(ctx, resp, output); err != nil {
		if errors.Is(err, context.Canceled) {
			return
		}
		errResp := middleware.NewCursorWebError(http.StatusBadGateway, err.Error())
		select {
		case output <- errResp:
		default:
			logrus.WithError(err).Warn("failed to push SSE error to channel")
		}
	}
}

func (s *CursorService) fetchXIsHuman(ctx context.Context) (string, error) {
	// 检查缓存
	s.scriptMutex.RLock()
	cached := s.scriptCache
	lastFetch := s.scriptCacheTime
	s.scriptMutex.RUnlock()

	var scriptBody string
	// 缓存有效期30分钟
	if cached != "" && time.Since(lastFetch) < 30*time.Minute {
		scriptBody = cached
	} else {
		resp, err := s.client.R().
			SetContext(ctx).
			SetHeaders(s.scriptHeaders()).
			Get(s.config.ScriptURL)

		if err != nil {
			// 如果请求失败且有缓存，使用缓存
			if cached != "" {
				logrus.Warnf("Failed to fetch script, using cached version: %v", err)
				scriptBody = cached
			} else {
				return "", fmt.Errorf("failed to fetch script: %w", err)
			}
		} else if resp.StatusCode != http.StatusOK {
			// 如果状态码异常且有缓存，使用缓存
			if cached != "" {
				logrus.Warnf("Script fetch returned status %d, using cached version", resp.StatusCode)
				scriptBody = cached
			} else {
				message := strings.TrimSpace(resp.String())
				return "", middleware.NewCursorWebError(resp.StatusCode, message)
			}
		} else {
			scriptBody = string(resp.Bytes())
			// 更新缓存
			s.scriptMutex.Lock()
			s.scriptCache = scriptBody
			s.scriptCacheTime = time.Now()
			s.scriptMutex.Unlock()
		}
	}

	compiled := s.prepareJS(scriptBody)
	value, err := utils.RunJS(compiled)
	if err != nil {
		return "", fmt.Errorf("failed to execute JS: %w", err)
	}

	logrus.WithField("length", len(value)).Debug("Fetched x-is-human token")

	return value, nil
}

func (s *CursorService) prepareJS(cursorJS string) string {
	replacer := strings.NewReplacer(
		"$$currentScriptSrc$$", s.config.ScriptURL,
		"$$UNMASKED_VENDOR_WEBGL$$", s.config.FP.UNMASKED_VENDOR_WEBGL,
		"$$UNMASKED_RENDERER_WEBGL$$", s.config.FP.UNMASKED_RENDERER_WEBGL,
		"$$userAgent$$", s.config.FP.UserAgent,
	)

	mainScript := replacer.Replace(s.mainJS)
	mainScript = strings.Replace(mainScript, "$$env_jscode$$", s.envJS, 1)
	mainScript = strings.Replace(mainScript, "$$cursor_jscode$$", cursorJS, 1)
	return mainScript
}

func (s *CursorService) truncateMessages(messages []models.Message) []models.Message {
	if len(messages) == 0 || s.config.MaxInputLength <= 0 {
		return messages
	}

	maxLength := s.config.MaxInputLength
	total := 0
	for _, msg := range messages {
		total += len(msg.GetStringContent())
	}

	if total <= maxLength {
		return messages
	}

	var result []models.Message
	startIdx := 0

	if strings.EqualFold(messages[0].Role, "system") {
		result = append(result, messages[0])
		maxLength -= len(messages[0].GetStringContent())
		if maxLength < 0 {
			maxLength = 0
		}
		startIdx = 1
	}

	current := 0
	collected := make([]models.Message, 0, len(messages)-startIdx)
	for i := len(messages) - 1; i >= startIdx; i-- {
		msg := messages[i]
		msgLen := len(msg.GetStringContent())
		if msgLen == 0 {
			continue
		}
		if current+msgLen > maxLength {
			continue
		}
		collected = append(collected, msg)
		current += msgLen
	}

	for i, j := 0, len(collected)-1; i < j; i, j = i+1, j-1 {
		collected[i], collected[j] = collected[j], collected[i]
	}

	return append(result, collected...)
}

func (s *CursorService) chatHeaders(xIsHuman string) map[string]string {
	return map[string]string{
		"sec-ch-ua-platform": `"macOS"`,
		"x-path":             "/api/chat",
		"Referer":            "https://cursor.com/en-US/learn/how-ai-models-work",
		"sec-ch-ua":          `"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"`,
		"x-method":           "POST",
		"sec-ch-ua-mobile":   "?0",
		"x-is-human":         xIsHuman,
		"User-Agent":         s.config.FP.UserAgent,
		"content-type":       "application/json",
	}
}

func (s *CursorService) scriptHeaders() map[string]string {
	return map[string]string{
		"User-Agent":                 s.config.FP.UserAgent,
		"sec-ch-ua-arch":             `"x86"`,
		"sec-ch-ua-platform":         `"Windows"`,
		"sec-ch-ua":                  `"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"`,
		"sec-ch-ua-bitness":          `"64"`,
		"sec-ch-ua-mobile":           "?0",
		"sec-ch-ua-platform-version": `"19.0.0"`,
		"sec-fetch-site":             "same-origin",
		"sec-fetch-mode":             "no-cors",
		"sec-fetch-dest":             "script",
		"referer":                    "https://cursor.com/cn/learn/how-ai-models-work",
		"accept-language":            "zh-CN,zh;q=0.9,en;q=0.8",
	}
}
