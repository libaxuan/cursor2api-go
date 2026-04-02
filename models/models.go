// Copyright (c) 2025-2026 libaxuan
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package models

import (
	"encoding/json"
	"time"
)

// ChatCompletionRequest OpenAI聊天完成请求
type ChatCompletionRequest struct {
	Model       string          `json:"model" binding:"required"`
	Messages    []Message       `json:"messages" binding:"required"`
	Stream      bool            `json:"stream,omitempty"`
	Temperature *float64        `json:"temperature,omitempty"`
	MaxTokens   *int            `json:"max_tokens,omitempty"`
	TopP        *float64        `json:"top_p,omitempty"`
	Stop        []string        `json:"stop,omitempty"`
	User        string          `json:"user,omitempty"`
	Tools       []Tool          `json:"tools,omitempty"`
	ToolChoice  json.RawMessage `json:"tool_choice,omitempty"`
}

// Message 消息结构
type Message struct {
	Role             string      `json:"role" binding:"required"`
	Content          interface{} `json:"content"`
	ReasoningContent string      `json:"reasoning_content,omitempty"`
	ToolCalls        []ToolCall  `json:"tool_calls,omitempty"`
	ToolCallID       string      `json:"tool_call_id,omitempty"`
	Name             string      `json:"name,omitempty"`
}

// ContentPart 消息内容部分（用于多模态内容）
type ContentPart struct {
	Type string `json:"type"`
	Text string `json:"text,omitempty"`
	URL  string `json:"url,omitempty"`
}

// Tool OpenAI工具定义
type Tool struct {
	Type     string             `json:"type"`
	Function FunctionDefinition `json:"function"`
}

// FunctionDefinition OpenAI函数定义
type FunctionDefinition struct {
	Name        string                 `json:"name"`
	Description string                 `json:"description,omitempty"`
	Parameters  map[string]interface{} `json:"parameters,omitempty"`
}

// ToolCall OpenAI工具调用
type ToolCall struct {
	ID       string       `json:"id"`
	Type     string       `json:"type"`
	Function FunctionCall `json:"function"`
}

// FunctionCall OpenAI函数调用信息
type FunctionCall struct {
	Name      string `json:"name"`
	Arguments string `json:"arguments"`
}

// ToolChoiceObject OpenAI tool_choice 对象形式
type ToolChoiceObject struct {
	Type     string              `json:"type"`
	Function *ToolChoiceFunction `json:"function,omitempty"`
}

// ToolChoiceFunction tool_choice 中的函数名
type ToolChoiceFunction struct {
	Name string `json:"name"`
}

// ChatCompletionResponse OpenAI聊天完成响应
type ChatCompletionResponse struct {
	ID      string   `json:"id"`
	Object  string   `json:"object"`
	Created int64    `json:"created"`
	Model   string   `json:"model"`
	Choices []Choice `json:"choices"`
	Usage   Usage    `json:"usage"`
}

// ChatCompletionStreamResponse 流式响应
type ChatCompletionStreamResponse struct {
	ID      string         `json:"id"`
	Object  string         `json:"object"`
	Created int64          `json:"created"`
	Model   string         `json:"model"`
	Choices []StreamChoice `json:"choices"`
}

// Choice 选择结构
type Choice struct {
	Index        int     `json:"index"`
	Message      Message `json:"message"`
	FinishReason string  `json:"finish_reason"`
}

// StreamChoice 流式选择结构
type StreamChoice struct {
	Index        int         `json:"index"`
	Delta        StreamDelta `json:"delta"`
	FinishReason *string     `json:"finish_reason"`
}

// StreamDelta 流式增量数据
type StreamDelta struct {
	Role             string          `json:"role,omitempty"`
	Content          string          `json:"content,omitempty"`
	ReasoningContent string          `json:"reasoning_content,omitempty"`
	ToolCalls        []ToolCallDelta `json:"tool_calls,omitempty"`
}

// ToolCallDelta 流式工具调用增量
type ToolCallDelta struct {
	Index    int                `json:"index"`
	ID       string             `json:"id,omitempty"`
	Type     string             `json:"type,omitempty"`
	Function *FunctionCallDelta `json:"function,omitempty"`
}

// FunctionCallDelta 流式函数调用增量
type FunctionCallDelta struct {
	Name      string `json:"name,omitempty"`
	Arguments string `json:"arguments,omitempty"`
}

// Usage 使用统计
type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

// Model 模型信息
type Model struct {
	ID            string `json:"id"`
	Object        string `json:"object"`
	Created       int64  `json:"created"`
	OwnedBy       string `json:"owned_by"`
	MaxTokens     int    `json:"max_tokens,omitempty"`
	ContextWindow int    `json:"context_window,omitempty"`
}

// ModelsResponse 模型列表响应
type ModelsResponse struct {
	Object string  `json:"object"`
	Data   []Model `json:"data"`
}

// ErrorResponse 错误响应
type ErrorResponse struct {
	Error ErrorDetail `json:"error"`
}

// ErrorDetail 错误详情
type ErrorDetail struct {
	Message string `json:"message"`
	Type    string `json:"type"`
	Code    string `json:"code,omitempty"`
}

// CursorMessage Cursor消息格式
type CursorMessage struct {
	Role  string       `json:"role"`
	Parts []CursorPart `json:"parts"`
}

// CursorPart Cursor消息部分
type CursorPart struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

// CursorRequest Cursor请求格式
type CursorRequest struct {
	Context  []interface{}   `json:"context"`
	Model    string          `json:"model"`
	ID       string          `json:"id"`
	Messages []CursorMessage `json:"messages"`
	Trigger  string          `json:"trigger"`
}

// CursorEventData Cursor事件数据
type CursorEventData struct {
	Type            string                 `json:"type"`
	Delta           string                 `json:"delta,omitempty"`
	ErrorText       string                 `json:"errorText,omitempty"`
	MessageMetadata *CursorMessageMetadata `json:"messageMetadata,omitempty"`
}

// CursorMessageMetadata Cursor消息元数据
type CursorMessageMetadata struct {
	Usage *CursorUsage `json:"usage,omitempty"`
}

// CursorUsage Cursor使用统计
type CursorUsage struct {
	InputTokens  int `json:"inputTokens"`
	OutputTokens int `json:"outputTokens"`
	TotalTokens  int `json:"totalTokens"`
}

// SSEEvent 服务器发送事件
type SSEEvent struct {
	Data  string `json:"data"`
	Event string `json:"event,omitempty"`
	ID    string `json:"id,omitempty"`
}

// CursorParseConfig 定义上游文本协议解析选项
type CursorParseConfig struct {
	TriggerSignal   string
	ThinkingEnabled bool
}

// AssistantEventKind 助手输出事件类型
type AssistantEventKind string

const (
	AssistantEventText     AssistantEventKind = "text"
	AssistantEventThinking AssistantEventKind = "thinking"
	AssistantEventToolCall AssistantEventKind = "tool_call"
)

// AssistantEvent 是内部流式解析事件
type AssistantEvent struct {
	Kind     AssistantEventKind
	Text     string
	Thinking string
	ToolCall *ToolCall
}

// GetStringContent 获取消息的字符串内容
func (m *Message) GetStringContent() string {
	if m.Content == nil {
		return ""
	}

	switch content := m.Content.(type) {
	case string:
		return content
	case []ContentPart:
		var text string
		for _, part := range content {
			if part.Type == "text" {
				text += part.Text
			}
		}
		return text
	case []interface{}:
		var text string
		for _, item := range content {
			if part, ok := item.(map[string]interface{}); ok {
				if partType, exists := part["type"].(string); exists && partType == "text" {
					if textContent, exists := part["text"].(string); exists {
						text += textContent
					}
				}
			}
		}
		return text
	default:
		if data, err := json.Marshal(content); err == nil {
			return string(data)
		}
		return ""
	}
}

// ToCursorMessages 将OpenAI消息转换为Cursor格式
func ToCursorMessages(messages []Message, systemPromptInject string) []CursorMessage {
	var result []CursorMessage

	if systemPromptInject != "" {
		if len(messages) > 0 && messages[0].Role == "system" {
			content := messages[0].GetStringContent()
			content += "\n" + systemPromptInject
			result = append(result, CursorMessage{
				Role: "system",
				Parts: []CursorPart{
					{Type: "text", Text: content},
				},
			})
			messages = messages[1:]
		} else {
			result = append(result, CursorMessage{
				Role: "system",
				Parts: []CursorPart{
					{Type: "text", Text: systemPromptInject},
				},
			})
		}
	} else if len(messages) > 0 && messages[0].Role == "system" {
		result = append(result, CursorMessage{
			Role: "system",
			Parts: []CursorPart{
				{Type: "text", Text: messages[0].GetStringContent()},
			},
		})
		messages = messages[1:]
	}

	for _, msg := range messages {
		if msg.Role == "" {
			continue
		}

		result = append(result, CursorMessage{
			Role: msg.Role,
			Parts: []CursorPart{
				{
					Type: "text",
					Text: msg.GetStringContent(),
				},
			},
		})
	}

	return result
}

// NewChatCompletionResponse 创建聊天完成响应
func NewChatCompletionResponse(id, model string, message Message, finishReason string, usage Usage) *ChatCompletionResponse {
	return &ChatCompletionResponse{
		ID:      id,
		Object:  "chat.completion",
		Created: time.Now().Unix(),
		Model:   model,
		Choices: []Choice{
			{
				Index:        0,
				Message:      message,
				FinishReason: finishReason,
			},
		},
		Usage: usage,
	}
}

// NewChatCompletionStreamResponse 创建流式响应
func NewChatCompletionStreamResponse(id, model string, delta StreamDelta, finishReason *string) *ChatCompletionStreamResponse {
	return &ChatCompletionStreamResponse{
		ID:      id,
		Object:  "chat.completion.chunk",
		Created: time.Now().Unix(),
		Model:   model,
		Choices: []StreamChoice{
			{
				Index:        0,
				Delta:        delta,
				FinishReason: finishReason,
			},
		},
	}
}

// NewErrorResponse 创建错误响应
func NewErrorResponse(message, errorType, code string) *ErrorResponse {
	return &ErrorResponse{
		Error: ErrorDetail{
			Message: message,
			Type:    errorType,
			Code:    code,
		},
	}
}
