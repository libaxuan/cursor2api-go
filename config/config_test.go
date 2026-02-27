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

package config

import (
	"os"
	"testing"
)

func TestLoadConfig(t *testing.T) {
	// Create a temporary .env file for testing
	envContent := `PORT=9000
DEBUG=true
API_KEY=test-key
MODELS=gpt-4o,claude-3
SYSTEM_PROMPT_INJECT=Test prompt
TIMEOUT=60
MAX_INPUT_LENGTH=10000
USER_AGENT=Test Agent
SCRIPT_URL=https://test.com/script.js`

	// Write to temporary .env file
	err := os.WriteFile(".env", []byte(envContent), 0644)
	if err != nil {
		t.Fatalf("Failed to create test .env file: %v", err)
	}
	defer os.Remove(".env") // Clean up

	config, err := LoadConfig()
	if err != nil {
		t.Fatalf("LoadConfig() error = %v", err)
	}

	// Test loaded values
	if config.Port != 9000 {
		t.Errorf("Port = %v, want 9000", config.Port)
	}
	if !config.Debug {
		t.Errorf("Debug = %v, want true", config.Debug)
	}
	if config.APIKey != "test-key" {
		t.Errorf("APIKey = %v, want test-key", config.APIKey)
	}
	if config.SystemPromptInject != "Test prompt" {
		t.Errorf("SystemPromptInject = %v, want Test prompt", config.SystemPromptInject)
	}
	if config.Timeout != 60 {
		t.Errorf("Timeout = %v, want 60", config.Timeout)
	}
	if config.MaxInputLength != 10000 {
		t.Errorf("MaxInputLength = %v, want 10000", config.MaxInputLength)
	}
	if config.FP.UserAgent != "Test Agent" {
		t.Errorf("UserAgent = %v, want Test Agent", config.FP.UserAgent)
	}
	if config.ScriptURL != "https://test.com/script.js" {
		t.Errorf("ScriptURL = %v, want https://test.com/script.js", config.ScriptURL)
	}
}

func TestGetModels(t *testing.T) {
	config := &Config{
		Models: "gpt-4o, claude-3 , gpt-3.5",
	}

	models := config.GetModels()
	expected := []string{"gpt-4o", "claude-3", "gpt-3.5"}

	if len(models) != len(expected) {
		t.Errorf("GetModels() length = %v, want %v", len(models), len(expected))
	}

	for i, model := range models {
		if model != expected[i] {
			t.Errorf("GetModels()[%d] = %v, want %v", i, model, expected[i])
		}
	}
}

func TestIsValidModel(t *testing.T) {
	config := &Config{
		Models: "gpt-4o,claude-3,gpt-3.5",
	}

	tests := []struct {
		name     string
		model    string
		expected bool
	}{
		{"valid model gpt-4o", "gpt-4o", true},
		{"valid model claude-3", "claude-3", true},
		{"invalid model gpt-5", "gpt-5", false},
		{"empty model", "", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := config.IsValidModel(tt.model)
			if result != tt.expected {
				t.Errorf("IsValidModel(%q) = %v, want %v", tt.model, result, tt.expected)
			}
		})
	}
}

func TestValidate(t *testing.T) {
	tests := []struct {
		name    string
		config  *Config
		wantErr bool
	}{
		{
			name: "valid config",
			config: &Config{
				Port:            8000,
				APIKey:          "test-key",
				Timeout:         30,
				MaxInputLength:  1000,
			},
			wantErr: false,
		},
		{
			name: "invalid port - too low",
			config: &Config{
				Port:            0,
				APIKey:          "test-key",
				Timeout:         30,
				MaxInputLength:  1000,
			},
			wantErr: true,
		},
		{
			name: "invalid port - too high",
			config: &Config{
				Port:            70000,
				APIKey:          "test-key",
				Timeout:         30,
				MaxInputLength:  1000,
			},
			wantErr: true,
		},
		{
			name: "missing API key",
			config: &Config{
				Port:            8000,
				APIKey:          "",
				Timeout:         30,
				MaxInputLength:  1000,
			},
			wantErr: true,
		},
		{
			name: "invalid timeout",
			config: &Config{
				Port:            8000,
				APIKey:          "test-key",
				Timeout:         0,
				MaxInputLength:  1000,
			},
			wantErr: true,
		},
		{
			name: "invalid max input length",
			config: &Config{
				Port:            8000,
				APIKey:          "test-key",
				Timeout:         30,
				MaxInputLength:  0,
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.config.validate()
			if (err != nil) != tt.wantErr {
				t.Errorf("validate() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}