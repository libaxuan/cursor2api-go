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

package handlers

import (
	"cursor2api-go/config"
	"cursor2api-go/middleware"
	"cursor2api-go/models"
	"cursor2api-go/services"
	"cursor2api-go/utils"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// Handler 处理器结构
type Handler struct {
	config        *config.Config
	cursorService *services.CursorService
	docsContent   []byte
}

// NewHandler 创建新的处理器
func NewHandler(cfg *config.Config) *Handler {
	cursorService := services.NewCursorService(cfg)

	// 预加载文档内容
	docsPath := "static/docs.html"
	var docsContent []byte

	if data, err := os.ReadFile(docsPath); err == nil {
		docsContent = data
	} else {
		// 如果文件不存在，使用默认的简单HTML页面
		simpleHTML := `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cursor2API - Go Version</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
        code {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        .endpoint {
            background: #e3f2fd;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 3px solid #2196f3;
        }
        .status-ok {
            color: #28a745;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Cursor2API - Go Version</h1>
        
        <div class="info">
            <p><strong>Status:</strong> <span class="status-ok">✅ Running</span></p>
            <p><strong>Version:</strong> Go Implementation</p>
            <p><strong>Description:</strong> OpenAI-compatible API proxy for Cursor AI</p>
        </div>
        
        <div class="info">
            <h3>📡 Available Endpoints:</h3>
            <div class="endpoint">
                <strong>GET</strong> <code>/v1/models</code><br>
                <small>List available AI models</small>
            </div>
            <div class="endpoint">
                <strong>POST</strong> <code>/v1/chat/completions</code><br>
                <small>Create chat completion (supports streaming)</small>
            </div>
            <div class="endpoint">
                <strong>GET</strong> <code>/health</code><br>
                <small>Health check endpoint</small>
            </div>
        </div>
        
        <div class="info">
            <h3>🔐 Authentication:</h3>
            <p>Use Bearer token authentication:</p>
            <code>Authorization: Bearer YOUR_API_KEY</code>
            <p><small>Default API key: <code>0000</code> (change via API_KEY environment variable)</small></p>
        </div>
        
        <div class="info">
            <h3>💻 Example Usage:</h3>
            <pre><code>curl -X POST http://localhost:8002/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0000" \
  -d '{
    "model": "claude-sonnet-4.6",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'</code></pre>
        </div>
        
        <div class="info">
            <p><strong>Repository:</strong> <a href="https://github.com/cursor2api/cursor2api-go">cursor2api-go</a></p>
            <p><strong>Documentation:</strong> OpenAI API compatible</p>
        </div>
    </div>
</body>
</html>`
		docsContent = []byte(simpleHTML)
	}

	return &Handler{
		config:        cfg,
		cursorService: cursorService,
		docsContent:   docsContent,
	}

}

// ListModels 列出可用模型
func (h *Handler) ListModels(c *gin.Context) {
	modelNames := h.config.GetModels()
	modelList := make([]models.Model, 0, len(modelNames))

	for _, modelID := range modelNames {
		// 获取模型配置信息
		modelConfig, exists := models.GetModelConfig(modelID)

		model := models.Model{
			ID:      modelID,
			Object:  "model",
			Created: time.Now().Unix(),
			OwnedBy: "cursor2api",
		}

		// 如果找到模型配置，添加max_tokens和context_window信息
		if exists {
			model.MaxTokens = modelConfig.MaxTokens
			model.ContextWindow = modelConfig.ContextWindow
		}

		modelList = append(modelList, model)
	}

	response := models.ModelsResponse{
		Object: "list",
		Data:   modelList,
	}

	c.JSON(http.StatusOK, response)
}

// ChatCompletions 处理聊天完成请求
func (h *Handler) ChatCompletions(c *gin.Context) {
	var request models.ChatCompletionRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		logrus.WithError(err).Error("Failed to bind request")
		c.JSON(http.StatusBadRequest, models.NewErrorResponse(
			"Invalid request format",
			"invalid_request_error",
			"invalid_json",
		))
		return
	}

	// 验证模型
	if !h.config.IsValidModel(request.Model) {
		c.JSON(http.StatusBadRequest, models.NewErrorResponse(
			"Invalid model specified",
			"invalid_request_error",
			"model_not_found",
		))
		return
	}

	// 验证消息
	if len(request.Messages) == 0 {
		c.JSON(http.StatusBadRequest, models.NewErrorResponse(
			"Messages cannot be empty",
			"invalid_request_error",
			"missing_messages",
		))
		return
	}

	// 验证并调整max_tokens参数
	request.MaxTokens = models.ValidateMaxTokens(request.Model, request.MaxTokens)

	// 调用Cursor服务
	chatGenerator, err := h.cursorService.ChatCompletion(c.Request.Context(), &request)
	if err != nil {
		logrus.WithError(err).Error("Failed to create chat completion")
		middleware.HandleError(c, err)
		return
	}

	// 根据是否流式返回不同响应
	if request.Stream {
		utils.SafeStreamWrapper(utils.StreamChatCompletion, c, chatGenerator, request.Model)
	} else {
		utils.NonStreamChatCompletion(c, chatGenerator, request.Model)
	}
}

// ServeDocs 服务API文档页面
func (h *Handler) ServeDocs(c *gin.Context) {
	c.Data(http.StatusOK, "text/html; charset=utf-8", h.docsContent)
}

// Health 健康检查
func (h *Handler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":    "ok",
		"timestamp": time.Now().Unix(),
		"version":   "go-1.0.0",
	})
}
