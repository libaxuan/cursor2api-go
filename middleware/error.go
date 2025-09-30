package middleware

import (
	"cursor2api-go/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// CursorWebError Cursor Web API错误
type CursorWebError struct {
	StatusCode int    `json:"status_code"`
	Message    string `json:"message"`
}

// Error 实现error接口
func (e *CursorWebError) Error() string {
	return e.Message
}

// NewCursorWebError 创建新的CursorWebError
func NewCursorWebError(statusCode int, message string) *CursorWebError {
	return &CursorWebError{
		StatusCode: statusCode,
		Message:    message,
	}
}

// ErrorHandler 全局错误处理中间件
func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		// 处理上下文中的错误
		if len(c.Errors) > 0 {
			err := c.Errors.Last().Err
			handleError(c, err)
		}
	}
}

// HandleError 处理错误并返回适当的响应
func HandleError(c *gin.Context, err error) {
	handleError(c, err)
}

// handleError 内部错误处理逻辑
func handleError(c *gin.Context, err error) {
	// 如果已经写入了响应头，则不再处理
	if c.Writer.Written() {
		return
	}

	logrus.WithError(err).Error("API error occurred")

	switch e := err.(type) {
	case *CursorWebError:
		// 处理Cursor Web错误
		errorResponse := models.NewErrorResponse(
			e.Message,
			"cursor_web_error",
			"",
		)
		c.JSON(e.StatusCode, errorResponse)

	case *gin.Error:
		// 处理Gin绑定错误
		statusCode := http.StatusBadRequest
		if e.Type == gin.ErrorTypePublic {
			statusCode = http.StatusInternalServerError
		}
		
		errorResponse := models.NewErrorResponse(
			e.Error(),
			"validation_error",
			"invalid_request",
		)
		c.JSON(statusCode, errorResponse)

	default:
		// 处理其他错误
		errorResponse := models.NewErrorResponse(
			"Internal server error",
			"internal_error",
			"",
		)
		c.JSON(http.StatusInternalServerError, errorResponse)
	}
}

// RecoveryHandler 自定义恢复中间件
func RecoveryHandler() gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, recovered interface{}) {
		logrus.WithField("panic", recovered).Error("Panic occurred")
		
		if c.Writer.Written() {
			return
		}
		
		errorResponse := models.NewErrorResponse(
			"Internal server error",
			"panic_error",
			"",
		)
		c.JSON(http.StatusInternalServerError, errorResponse)
	})
}

// ValidationError 验证错误
type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

// MultipleValidationError 多个验证错误
type MultipleValidationError struct {
	Errors []ValidationError `json:"errors"`
}

// Error 实现error接口
func (e *MultipleValidationError) Error() string {
	return "validation failed"
}

// NewValidationError 创建验证错误
func NewValidationError(field, message string) *ValidationError {
	return &ValidationError{
		Field:   field,
		Message: message,
	}
}

// AuthenticationError 认证错误
type AuthenticationError struct {
	Message string `json:"message"`
}

// Error 实现error接口
func (e *AuthenticationError) Error() string {
	return e.Message
}

// NewAuthenticationError 创建认证错误
func NewAuthenticationError(message string) *AuthenticationError {
	return &AuthenticationError{
		Message: message,
	}
}

// RateLimitError 限流错误
type RateLimitError struct {
	Message     string `json:"message"`
	RetryAfter  int    `json:"retry_after"`
}

// Error 实现error接口
func (e *RateLimitError) Error() string {
	return e.Message
}

// NewRateLimitError 创建限流错误
func NewRateLimitError(message string, retryAfter int) *RateLimitError {
	return &RateLimitError{
		Message:    message,
		RetryAfter: retryAfter,
	}
}