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

package middleware

import (
	"cursor2api-go/models"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

// AuthRequired 认证中间件
func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		
		if authHeader == "" {
			errorResponse := models.NewErrorResponse(
				"Missing authorization header",
				"authentication_error",
				"missing_auth",
			)
			c.JSON(http.StatusUnauthorized, errorResponse)
			c.Abort()
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			errorResponse := models.NewErrorResponse(
				"Invalid authorization format. Expected 'Bearer <token>'",
				"authentication_error",
				"invalid_auth_format",
			)
			c.JSON(http.StatusUnauthorized, errorResponse)
			c.Abort()
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")
		expectedToken := os.Getenv("API_KEY")
		if expectedToken == "" {
			expectedToken = "0000" // 默认值
		}

		if token != expectedToken {
			errorResponse := models.NewErrorResponse(
				"Invalid API key",
				"authentication_error",
				"invalid_api_key",
			)
			c.JSON(http.StatusUnauthorized, errorResponse)
			c.Abort()
			return
		}

		// 认证通过，继续处理请求
		c.Next()
	}
}