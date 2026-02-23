package config

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

// Config 应用程序配置结构
type Config struct {
	// 服务器配置
	Port  int  `json:"port"`
	Debug bool `json:"debug"`

	// API配置
	APIKey             string `json:"api_key"`
	Models             string `json:"models"`
	SystemPromptInject string `json:"system_prompt_inject"`
	Timeout            int    `json:"timeout"`
	MaxInputLength     int    `json:"max_input_length"`

	// Cursor相关配置
	ScriptURL string `json:"script_url"`
	FP        FP     `json:"fp"`
}

// FP 指纹配置结构
type FP struct {
	UserAgent               string `json:"userAgent"`
	UNMASKED_VENDOR_WEBGL   string `json:"unmaskedVendorWebgl"`
	UNMASKED_RENDERER_WEBGL string `json:"unmaskedRendererWebgl"`
}

// LoadConfig 加载配置
func LoadConfig() (*Config, error) {
	// 尝试加载.env文件
	if err := godotenv.Load(); err != nil {
		logrus.Debug("No .env file found, using environment variables")
	}

	config := &Config{
		// 设置默认值
		Port:               getEnvAsInt("PORT", 8002),
		Debug:              getEnvAsBool("DEBUG", false),
		APIKey:             getEnv("API_KEY", "0000"),
		Models:             getEnv("MODELS", "gpt-5.2-high,claude-opus-4.6,claude-sonnet-4.5,gpt-codex-5.3-high,composer-1.5,gpt-4o,claude-3.5-sonnet,claude-3.5-haiku,claude-3.7-sonnet,claude-4-sonnet,claude-4.5-sonnet,claude-4-opus,claude-4.1-opus,gemini-2.5-pro,gemini-2.5-flash,o3,o4-mini,deepseek-r1"),
		SystemPromptInject: getEnv("SYSTEM_PROMPT_INJECT", ""),
		Timeout:            getEnvAsInt("TIMEOUT", 30),
		MaxInputLength:     getEnvAsInt("MAX_INPUT_LENGTH", 200000),
		ScriptURL:          getEnv("SCRIPT_URL", "https://cursor.com/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/a-4-a/c.js?i=0&v=3&h=cursor.com"),
		FP: FP{
			UserAgent:               getEnv("USER_AGENT", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"),
			UNMASKED_VENDOR_WEBGL:   getEnv("UNMASKED_VENDOR_WEBGL", "Google Inc. (Intel)"),
			UNMASKED_RENDERER_WEBGL: getEnv("UNMASKED_RENDERER_WEBGL", "ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)"),
		},
	}

	// 验证必要的配置
	if err := config.validate(); err != nil {
		return nil, fmt.Errorf("config validation failed: %w", err)
	}

	return config, nil
}

// validate 验证配置
func (c *Config) validate() error {
	if c.Port <= 0 || c.Port > 65535 {
		return fmt.Errorf("invalid port: %d", c.Port)
	}

	if c.APIKey == "" {
		return fmt.Errorf("API_KEY is required")
	}

	if c.Timeout <= 0 {
		return fmt.Errorf("timeout must be positive")
	}

	if c.MaxInputLength <= 0 {
		return fmt.Errorf("max input length must be positive")
	}

	return nil
}

// GetModels 获取模型列表
func (c *Config) GetModels() []string {
	models := strings.Split(c.Models, ",")
	result := make([]string, 0, len(models))
	for _, model := range models {
		if trimmed := strings.TrimSpace(model); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

// IsValidModel 检查模型是否有效
func (c *Config) IsValidModel(model string) bool {
	validModels := c.GetModels()
	for _, validModel := range validModels {
		if validModel == model {
			return true
		}
	}
	return false
}

// ToJSON 将配置序列化为JSON（用于调试）
func (c *Config) ToJSON() string {
	// 创建一个副本，隐藏敏感信息
	safeCfg := *c
	safeCfg.APIKey = "***"

	data, err := json.MarshalIndent(safeCfg, "", "  ")
	if err != nil {
		return fmt.Sprintf("Error marshaling config: %v", err)
	}
	return string(data)
}

// 辅助函数

// getEnv 获取环境变量，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvAsInt 获取环境变量并转换为int
func getEnvAsInt(key string, defaultValue int) int {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		logrus.Warnf("Invalid integer value for %s: %s, using default: %d", key, valueStr, defaultValue)
		return defaultValue
	}

	return value
}

// getEnvAsBool 获取环境变量并转换为bool
func getEnvAsBool(key string, defaultValue bool) bool {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}

	value, err := strconv.ParseBool(valueStr)
	if err != nil {
		logrus.Warnf("Invalid boolean value for %s: %s, using default: %t", key, valueStr, defaultValue)
		return defaultValue
	}

	return value
}
