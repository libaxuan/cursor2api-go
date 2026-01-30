package utils

import (
	"fmt"
	"math/rand"
	"runtime"
	"time"
)

// BrowserProfile 浏览器配置文件
type BrowserProfile struct {
	Platform        string
	PlatformVersion string
	Architecture    string
	Bitness         string
	ChromeVersion   int
	UserAgent       string
	Mobile          bool
}

var (
	// 常见的浏览器版本 (Chrome)
	chromeVersions = []int{120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130}

	// Windows 平台配置
	windowsProfiles = []BrowserProfile{
		{Platform: "Windows", PlatformVersion: "10.0.0", Architecture: "x86", Bitness: "64"},
		{Platform: "Windows", PlatformVersion: "11.0.0", Architecture: "x86", Bitness: "64"},
		{Platform: "Windows", PlatformVersion: "15.0.0", Architecture: "x86", Bitness: "64"},
	}

	// macOS 平台配置
	macosProfiles = []BrowserProfile{
		{Platform: "macOS", PlatformVersion: "13.0.0", Architecture: "arm", Bitness: "64"},
		{Platform: "macOS", PlatformVersion: "14.0.0", Architecture: "arm", Bitness: "64"},
		{Platform: "macOS", PlatformVersion: "15.0.0", Architecture: "arm", Bitness: "64"},
		{Platform: "macOS", PlatformVersion: "13.0.0", Architecture: "x86", Bitness: "64"},
		{Platform: "macOS", PlatformVersion: "14.0.0", Architecture: "x86", Bitness: "64"},
	}

	// Linux 平台配置
	linuxProfiles = []BrowserProfile{
		{Platform: "Linux", PlatformVersion: "", Architecture: "x86", Bitness: "64"},
	}
)

// HeaderGenerator 动态 header 生成器
type HeaderGenerator struct {
	profile       BrowserProfile
	chromeVersion int
	rng           *rand.Rand
}

// NewHeaderGenerator 创建新的 header 生成器
func NewHeaderGenerator() *HeaderGenerator {
	// 使用当前时间作为随机种子
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))

	// 根据当前操作系统选择合适的配置文件
	var profiles []BrowserProfile
	switch runtime.GOOS {
	case "darwin":
		profiles = macosProfiles
	case "linux":
		profiles = linuxProfiles
	default:
		profiles = windowsProfiles
	}

	// 随机选择一个配置文件
	profile := profiles[rng.Intn(len(profiles))]

	// 随机选择 Chrome 版本
	chromeVersion := chromeVersions[rng.Intn(len(chromeVersions))]
	profile.ChromeVersion = chromeVersion

	// 生成 User-Agent
	profile.UserAgent = generateUserAgent(profile)

	return &HeaderGenerator{
		profile:       profile,
		chromeVersion: chromeVersion,
		rng:           rng,
	}
}

// generateUserAgent 生成 User-Agent 字符串
func generateUserAgent(profile BrowserProfile) string {
	switch profile.Platform {
	case "Windows":
		return fmt.Sprintf("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%d.0.0.0 Safari/537.36", profile.ChromeVersion)
	case "macOS":
		if profile.Architecture == "arm" {
			return fmt.Sprintf("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%d.0.0.0 Safari/537.36", profile.ChromeVersion)
		}
		return fmt.Sprintf("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%d.0.0.0 Safari/537.36", profile.ChromeVersion)
	case "Linux":
		return fmt.Sprintf("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%d.0.0.0 Safari/537.36", profile.ChromeVersion)
	default:
		return fmt.Sprintf("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%d.0.0.0 Safari/537.36", profile.ChromeVersion)
	}
}

// GetChatHeaders 获取聊天请求的 headers
func (g *HeaderGenerator) GetChatHeaders(xIsHuman string) map[string]string {
	// 随机选择语言
	languages := []string{
		"en-US,en;q=0.9",
		"zh-CN,zh;q=0.9,en;q=0.8",
		"en-GB,en;q=0.9",
	}
	lang := languages[g.rng.Intn(len(languages))]

	// 随机选择 referer
	referers := []string{
		"https://cursor.com/en-US/learn/how-ai-models-work",
		"https://cursor.com/cn/learn/how-ai-models-work",
		"https://cursor.com/",
	}
	referer := referers[g.rng.Intn(len(referers))]

	headers := map[string]string{
		"sec-ch-ua-platform": fmt.Sprintf(`"%s"`, g.profile.Platform),
		"x-path":             "/api/chat",
		"Referer":            referer,
		"sec-ch-ua":          g.getSecChUa(),
		"x-method":           "POST",
		"sec-ch-ua-mobile":   "?0",
		"x-is-human":         xIsHuman,
		"User-Agent":         g.profile.UserAgent,
		"content-type":       "application/json",
		"accept-language":    lang,
	}

	// 添加可选的 headers
	if g.profile.Architecture != "" {
		headers["sec-ch-ua-arch"] = fmt.Sprintf(`"%s"`, g.profile.Architecture)
	}
	if g.profile.Bitness != "" {
		headers["sec-ch-ua-bitness"] = fmt.Sprintf(`"%s"`, g.profile.Bitness)
	}
	if g.profile.PlatformVersion != "" {
		headers["sec-ch-ua-platform-version"] = fmt.Sprintf(`"%s"`, g.profile.PlatformVersion)
	}

	return headers
}

// GetScriptHeaders 获取脚本请求的 headers
func (g *HeaderGenerator) GetScriptHeaders() map[string]string {
	// 随机选择语言
	languages := []string{
		"en-US,en;q=0.9",
		"zh-CN,zh;q=0.9,en;q=0.8",
		"en-GB,en;q=0.9",
	}
	lang := languages[g.rng.Intn(len(languages))]

	// 随机选择 referer
	referers := []string{
		"https://cursor.com/cn/learn/how-ai-models-work",
		"https://cursor.com/en-US/learn/how-ai-models-work",
		"https://cursor.com/",
	}
	referer := referers[g.rng.Intn(len(referers))]

	headers := map[string]string{
		"User-Agent":         g.profile.UserAgent,
		"sec-ch-ua-arch":     fmt.Sprintf(`"%s"`, g.profile.Architecture),
		"sec-ch-ua-platform": fmt.Sprintf(`"%s"`, g.profile.Platform),
		"sec-ch-ua":          g.getSecChUa(),
		"sec-ch-ua-bitness":  fmt.Sprintf(`"%s"`, g.profile.Bitness),
		"sec-ch-ua-mobile":   "?0",
		"sec-fetch-site":     "same-origin",
		"sec-fetch-mode":     "no-cors",
		"sec-fetch-dest":     "script",
		"referer":            referer,
		"accept-language":    lang,
	}

	if g.profile.PlatformVersion != "" {
		headers["sec-ch-ua-platform-version"] = fmt.Sprintf(`"%s"`, g.profile.PlatformVersion)
	}

	return headers
}

// getSecChUa 生成 sec-ch-ua header
func (g *HeaderGenerator) getSecChUa() string {
	// 生成随机的品牌版本
	notABrand := 24 + g.rng.Intn(10) // 24-33

	return fmt.Sprintf(`"Google Chrome";v="%d", "Chromium";v="%d", "Not(A:Brand";v="%d"`,
		g.chromeVersion, g.chromeVersion, notABrand)
}

// GetUserAgent 获取 User-Agent
func (g *HeaderGenerator) GetUserAgent() string {
	return g.profile.UserAgent
}

// GetProfile 获取浏览器配置文件
func (g *HeaderGenerator) GetProfile() BrowserProfile {
	return g.profile
}

// Refresh 刷新配置文件（生成新的随机配置）
func (g *HeaderGenerator) Refresh() {
	// 根据当前操作系统选择合适的配置文件
	var profiles []BrowserProfile
	switch runtime.GOOS {
	case "darwin":
		profiles = macosProfiles
	case "linux":
		profiles = linuxProfiles
	default:
		profiles = windowsProfiles
	}

	// 随机选择一个配置文件
	profile := profiles[g.rng.Intn(len(profiles))]

	// 随机选择 Chrome 版本
	chromeVersion := chromeVersions[g.rng.Intn(len(chromeVersions))]
	profile.ChromeVersion = chromeVersion

	// 生成 User-Agent
	profile.UserAgent = generateUserAgent(profile)

	g.profile = profile
	g.chromeVersion = chromeVersion
}

// GetRandomReferer 获取随机 referer
func GetRandomReferer() string {
	referers := []string{
		"https://cursor.com/en-US/learn/how-ai-models-work",
		"https://cursor.com/cn/learn/how-ai-models-work",
		"https://cursor.com/",
		"https://cursor.com/features",
	}
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	return referers[rng.Intn(len(referers))]
}

// GetRandomLanguage 获取随机语言设置
func GetRandomLanguage() string {
	languages := []string{
		"en-US,en;q=0.9",
		"zh-CN,zh;q=0.9,en;q=0.8",
		"en-GB,en;q=0.9",
		"ja-JP,ja;q=0.9,en;q=0.8",
	}
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	return languages[rng.Intn(len(languages))]
}
