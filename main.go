package main

import (
	"context"
	"cursor2api-go/config"
	"cursor2api-go/handlers"
	"cursor2api-go/middleware"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func main() {
	// 加载配置
	cfg, err := config.LoadConfig()
	if err != nil {
		logrus.Fatalf("Failed to load config: %v", err)
	}

	// 设置日志级别
	if cfg.Debug {
		logrus.SetLevel(logrus.DebugLevel)
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// 创建路由器
	router := gin.New()

	// 添加中间件
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())
	router.Use(middleware.ErrorHandler())

	// 创建处理器
	handler := handlers.NewHandler(cfg)

	// 注册路由
	setupRoutes(router, handler)

	// 创建HTTP服务器
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Port),
		Handler: router,
	}

	// 启动服务器的goroutine
	go func() {
		logrus.Infof("Starting Cursor2API server on port %d", cfg.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logrus.Fatalf("Failed to start server: %v", err)
		}
	}()

	// 等待中断信号以优雅关闭服务器
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logrus.Info("Shutting down server...")

	// 给服务器5秒时间完成处理正在进行的请求
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		logrus.Fatalf("Server forced to shutdown: %v", err)
	}

	logrus.Info("Server exited")
}

func setupRoutes(router *gin.Engine, handler *handlers.Handler) {
	// 健康检查
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"time":   time.Now().Unix(),
		})
	})

	// API文档页面
	router.GET("/", handler.ServeDocs)

	// API v1路由组
	v1 := router.Group("/v1")
	{
		// 模型列表
		v1.GET("/models", middleware.AuthRequired(), handler.ListModels)

		// 聊天完成
		v1.POST("/chat/completions", middleware.AuthRequired(), handler.ChatCompletions)
	}

	// 静态文件服务（如果需要）
	router.Static("/static", "./static")
}