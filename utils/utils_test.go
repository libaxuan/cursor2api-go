package utils

import (
	"testing"
)

func TestGenerateRandomString(t *testing.T) {
	tests := []struct {
		name   string
		length int
	}{
		{"zero length", 0},
		{"small length", 5},
		{"medium length", 16},
		{"large length", 32},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := GenerateRandomString(tt.length)
			if len(result) != tt.length {
				t.Errorf("GenerateRandomString(%d) length = %v, want %v", tt.length, len(result), tt.length)
			}
			// Check if result contains only hexadecimal characters
			for _, char := range result {
				if !((char >= '0' && char <= '9') || (char >= 'a' && char <= 'f')) {
					t.Errorf("GenerateRandomString() contains invalid character: %c", char)
				}
			}
		})
	}
}

func TestGenerateChatCompletionID(t *testing.T) {
	result := GenerateChatCompletionID()

	// Check prefix
	if len(result) < 9 || result[:9] != "chatcmpl-" {
		t.Errorf("GenerateChatCompletionID() = %v, should start with 'chatcmpl-'", result)
	}

	// Check total length (prefix + 29 characters)
	if len(result) != 38 {
		t.Errorf("GenerateChatCompletionID() length = %v, want 38", len(result))
	}
}

func TestParseSSELine(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{"valid SSE line", "data: {\"type\": \"delta\"}", "{\"type\": \"delta\"}"},
		{"SSE line with spaces", "data:  {\"type\": \"delta\"}", "{\"type\": \"delta\"}"},
		{"invalid SSE line", "event: message", ""},
		{"empty line", "", ""},
		{"data without colon", "data{\"type\": \"delta\"}", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := ParseSSELine(tt.input)
			if result != tt.expected {
				t.Errorf("ParseSSELine(%q) = %q, want %q", tt.input, result, tt.expected)
			}
		})
	}
}

func TestSanitizeContent(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{"normal text", "Hello world", "Hello world"},
		{"text with null bytes", "Hello\x00world", "Helloworld"},
		{"empty string", "", ""},
		{"only null bytes", "\x00\x00", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := SanitizeContent(tt.input)
			if result != tt.expected {
				t.Errorf("SanitizeContent(%q) = %q, want %q", tt.input, result, tt.expected)
			}
		})
	}
}

func TestValidateModel(t *testing.T) {
	validModels := []string{"gpt-4o", "gpt-4", "claude-3"}

	tests := []struct {
		name     string
		model    string
		expected bool
	}{
		{"valid model", "gpt-4o", true},
		{"another valid model", "claude-3", true},
		{"invalid model", "gpt-5", false},
		{"empty model", "", false},
		{"case sensitive", "GPT-4O", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := ValidateModel(tt.model, validModels)
			if result != tt.expected {
				t.Errorf("ValidateModel(%q, %v) = %v, want %v", tt.model, validModels, result, tt.expected)
			}
		})
	}
}