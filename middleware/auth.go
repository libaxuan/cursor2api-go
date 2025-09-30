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