package models

import (
	"testing"
)

func TestGetStringContent(t *testing.T) {
	tests := []struct {
		name     string
		content  interface{}
		expected string
	}{
		{
			name:     "string content",
			content:  "Hello world",
			expected: "Hello world",
		},
		{
			name: "array content",
			content: []ContentPart{
				{Type: "text", Text: "Hello"},
				{Type: "text", Text: " world"},
			},
			expected: "Hello world",
		},
		{
			name:     "empty array",
			content:  []ContentPart{},
			expected: "",
		},
		{
			name:     "nil content",
			content:  nil,
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			msg := &Message{Content: tt.content}
			result := msg.GetStringContent()
			if result != tt.expected {
				t.Errorf("GetStringContent() = %v, want %v", result, tt.expected)
			}
		})
	}
}

func TestToCursorMessages(t *testing.T) {
	tests := []struct {
		name             string
		messages         []Message
		systemPrompt     string
		expectedLength   int
		expectedFirstMsg string
	}{
		{
			name: "no system prompt",
			messages: []Message{
				{Role: "user", Content: "Hello"},
			},
			systemPrompt:     "",
			expectedLength:   1,
			expectedFirstMsg: "Hello",
		},
		{
			name: "with system prompt, no system message",
			messages: []Message{
				{Role: "user", Content: "Hello"},
			},
			systemPrompt:     "You are a helpful assistant",
			expectedLength:   2,
			expectedFirstMsg: "You are a helpful assistant",
		},
		{
			name: "with system prompt, has system message",
			messages: []Message{
				{Role: "system", Content: "Be helpful"},
				{Role: "user", Content: "Hello"},
			},
			systemPrompt:     "You are an AI",
			expectedLength:   2,
			expectedFirstMsg: "Be helpful\nYou are an AI",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := ToCursorMessages(tt.messages, tt.systemPrompt)
			if len(result) != tt.expectedLength {
				t.Errorf("ToCursorMessages() length = %v, want %v", len(result), tt.expectedLength)
			}
			if len(result) > 0 && result[0].Parts[0].Text != tt.expectedFirstMsg {
				t.Errorf("ToCursorMessages() first message = %v, want %v", result[0].Parts[0].Text, tt.expectedFirstMsg)
			}
		})
	}
}

func TestNewChatCompletionResponse(t *testing.T) {
	response := NewChatCompletionResponse("test-id", "gpt-4o", "Hello world", Usage{PromptTokens: 10, CompletionTokens: 5, TotalTokens: 15})

	if response.ID != "test-id" {
		t.Errorf("ID = %v, want test-id", response.ID)
	}
	if response.Model != "gpt-4o" {
		t.Errorf("Model = %v, want gpt-4o", response.Model)
	}
	if response.Choices[0].Message.Content != "Hello world" {
		t.Errorf("Content = %v, want Hello world", response.Choices[0].Message.Content)
	}
	if response.Usage.PromptTokens != 10 {
		t.Errorf("PromptTokens = %v, want 10", response.Usage.PromptTokens)
	}
}

func TestNewChatCompletionStreamResponse(t *testing.T) {
	response := NewChatCompletionStreamResponse("test-id", "gpt-4o", "Hello", stringPtr("stop"))

	if response.ID != "test-id" {
		t.Errorf("ID = %v, want test-id", response.ID)
	}
	if response.Choices[0].Delta.Content != "Hello" {
		t.Errorf("Content = %v, want Hello", response.Choices[0].Delta.Content)
	}
	if response.Choices[0].FinishReason == nil || *response.Choices[0].FinishReason != "stop" {
		t.Errorf("FinishReason = %v, want stop", response.Choices[0].FinishReason)
	}
}

func TestNewErrorResponse(t *testing.T) {
	response := NewErrorResponse("Test error", "test_error", "error_code")

	if response.Error.Message != "Test error" {
		t.Errorf("Message = %v, want Test error", response.Error.Message)
	}
	if response.Error.Type != "test_error" {
		t.Errorf("Type = %v, want test_error", response.Error.Type)
	}
	if response.Error.Code != "error_code" {
		t.Errorf("Code = %v, want error_code", response.Error.Code)
	}
}

// Helper function
func stringPtr(s string) *string {
	return &s
}