package models

// ModelConfig 模型配置结构
type ModelConfig struct {
	ID            string `json:"id"`             // 外部显示的 ID (OpenAI 兼容)
	InternalID    string `json:"internal_id"`    // Cursor 官方使用的内部 ID
	Provider      string `json:"provider"`
	MaxTokens     int    `json:"max_tokens"`
	ContextWindow int    `json:"context_window"`
}

// GetModelConfigs 获取所有模型配置
func GetModelConfigs() map[string]ModelConfig {
	return map[string]ModelConfig{
		// OpenAI GPT-5 系列
		"gpt-5": {
			ID:            "gpt-5",
			InternalID:    "gpt-5",
			Provider:      "OpenAI",
			MaxTokens:     4096,
			ContextWindow: 400000,
		},
		"gpt-5-codex": {
			ID:            "gpt-5-codex",
			InternalID:    "gpt-5-codex",
			Provider:      "OpenAI Codex",
			MaxTokens:     4096,
			ContextWindow: 192000,
		},
		"gpt-5-mini": {
			ID:            "gpt-5-mini",
			InternalID:    "gpt-5-mini",
			Provider:      "OpenAI GPT-5 Mini",
			MaxTokens:     4096,
			ContextWindow: 400000,
		},
		"gpt-5-nano": {
			ID:            "gpt-5-nano",
			InternalID:    "gpt-5-nano",
			Provider:      "OpenAI GPT-5 Nano",
			MaxTokens:     4096,
			ContextWindow: 400000,
		},
		"gpt-5.1": {
			ID:            "gpt-5.1",
			InternalID:    "gpt-5.1",
			Provider:      "OpenAI",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
		"gpt-5.2-high": {
			ID:            "gpt-5.2-high",
			InternalID:    "GPT-5.2 High",
			Provider:      "OpenAI",
			MaxTokens:     16384,
			ContextWindow: 2000000,
		},
		"gpt-codex-5.3-high": {
			ID:            "gpt-codex-5.3-high",
			InternalID:    "Codex 5.3 High",
			Provider:      "OpenAI Codex",
			MaxTokens:     8192,
			ContextWindow: 256000,
		},
		"composer-1.5": {
			ID:            "composer-1.5",
			InternalID:    "Composer 1.5",
			Provider:      "Cursor Composer",
			MaxTokens:     4096,
			ContextWindow: 128000,
		},

		// OpenAI GPT-4 系列
		"gpt-4.1": {
			ID:            "gpt-4.1",
			InternalID:    "gpt-4.1",
			Provider:      "OpenAI GPT-4.1",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
		"gpt-4o": {
			ID:            "gpt-4o",
			InternalID:    "gpt-4o",
			Provider:      "OpenAI GPT-4o",
			MaxTokens:     16384,
			ContextWindow: 128000,
		},

		// Anthropic Claude 系列
		"claude-3.5-sonnet": {
			ID:            "claude-3.5-sonnet",
			InternalID:    "claude-3.5-sonnet",
			Provider:      "Anthropic Claude",
			MaxTokens:     8192,
			ContextWindow: 200000,
		},
		"claude-opus-4.6": {
			ID:            "claude-opus-4.6",
			InternalID:    "Opus 4.6",
			Provider:      "Anthropic Claude",
			MaxTokens:     131072,
			ContextWindow: 1000000,
		},
		"claude-sonnet-4.5": {
			ID:            "claude-sonnet-4.5",
			InternalID:    "Sonnet 4.5",
			Provider:      "Anthropic Claude",
			MaxTokens:     16384,
			ContextWindow: 1000000,
		},
		"claude-3.5-haiku": {
			ID:            "claude-3.5-haiku",
			InternalID:    "claude-3.5-haiku",
			Provider:      "Anthropic Claude",
			MaxTokens:     4096,
			ContextWindow: 200000,
		},
		"claude-3.7-sonnet": {
			ID:            "claude-3.7-sonnet",
			InternalID:    "claude-3.7-sonnet",
			Provider:      "Anthropic Claude",
			MaxTokens:     8192,
			ContextWindow: 200000,
		},
		"claude-4-sonnet": {
			ID:            "claude-4-sonnet",
			InternalID:    "claude-4-sonnet",
			Provider:      "Anthropic Claude",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
		"claude-4.5-sonnet": {
			ID:            "claude-4.5-sonnet",
			InternalID:    "claude-4.5-sonnet",
			Provider:      "Anthropic Claude",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
		"claude-4-opus": {
			ID:            "claude-4-opus",
			InternalID:    "claude-4-opus",
			Provider:      "Anthropic Claude",
			MaxTokens:     4096,
			ContextWindow: 200000,
		},
		"claude-4.1-opus": {
			ID:            "claude-4.1-opus",
			InternalID:    "claude-4.1-opus",
			Provider:      "Anthropic Claude",
			MaxTokens:     4096,
			ContextWindow: 200000,
		},

		// Google Gemini 系列
		"gemini-2.5-pro": {
			ID:            "gemini-2.5-pro",
			InternalID:    "gemini-2.5-pro",
			Provider:      "Google Gemini",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
		"gemini-2.5-flash": {
			ID:            "gemini-2.5-flash",
			InternalID:    "gemini-2.5-flash",
			Provider:      "Google Gemini",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
		"gemini-3.0-pro": {
			ID:            "gemini-3.0-pro",
			InternalID:    "gemini-3.0-pro",
			Provider:      "Google Gemini",
			MaxTokens:     8192,
			ContextWindow: 2000000,
		},

		// OpenAI O-Series (Reasoning Models need high output limits)
		"o3": {
			ID:            "o3",
			InternalID:    "o3",
			Provider:      "OpenAI O-Series",
			MaxTokens:     65536,
			ContextWindow: 200000,
		},
		"o4-mini": {
			ID:            "o4-mini",
			InternalID:    "o4-mini",
			Provider:      "OpenAI O-Series",
			MaxTokens:     65536,
			ContextWindow: 200000,
		},

		// DeepSeek 系列
		"deepseek-r1": {
			ID:            "deepseek-r1",
			InternalID:    "deepseek-r1",
			Provider:      "DeepSeek",
			MaxTokens:     8192,
			ContextWindow: 128000,
		},
		"deepseek-v3.1": {
			ID:            "deepseek-v3.1",
			InternalID:    "deepseek-v3.1",
			Provider:      "DeepSeek",
			MaxTokens:     4096,
			ContextWindow: 128000,
		},

		// Moonshot AI
		"kimi-k2-instruct": {
			ID:            "kimi-k2-instruct",
			InternalID:    "kimi-k2-instruct",
			Provider:      "Moonshot AI",
			MaxTokens:     4096,
			ContextWindow: 256000,
		},

		// xAI Grok 系列
		"grok-3": {
			ID:            "grok-3",
			InternalID:    "grok-3",
			Provider:      "xAI Grok",
			MaxTokens:     8192,
			ContextWindow: 1000000,
		},
	}
}

// GetModelConfig 获取指定模型的配置
func GetModelConfig(modelID string) (ModelConfig, bool) {
	configs := GetModelConfigs()
	config, exists := configs[modelID]
	return config, exists
}

// GetInternalID 获取模型的内部官方名称
func GetInternalID(modelID string) string {
	if config, exists := GetModelConfig(modelID); exists {
		return config.InternalID
	}
	return modelID
}

// GetMaxTokensForModel 获取指定模型的最大token数
func GetMaxTokensForModel(modelID string) int {
	if config, exists := GetModelConfig(modelID); exists {
		return config.MaxTokens
	}
	// 默认返回4096
	return 4096
}

// GetContextWindowForModel 获取指定模型的上下文窗口大小
func GetContextWindowForModel(modelID string) int {
	if config, exists := GetModelConfig(modelID); exists {
		return config.ContextWindow
	}
	// 默认返回128000
	return 128000
}

// ValidateMaxTokens 验证并调整max_tokens参数
func ValidateMaxTokens(modelID string, requestedMaxTokens *int) *int {
	modelMaxTokens := GetMaxTokensForModel(modelID)

	// 如果没有指定max_tokens，使用模型默认值
	if requestedMaxTokens == nil {
		return &modelMaxTokens
	}

	// 如果请求的max_tokens超过模型限制，使用模型最大值
	if *requestedMaxTokens > modelMaxTokens {
		return &modelMaxTokens
	}

	// 如果请求的max_tokens小于等于0，使用模型默认值
	if *requestedMaxTokens <= 0 {
		return &modelMaxTokens
	}

	return requestedMaxTokens
}
