package main

import (
	"context"
	"cursor2api-go/config"
	"cursor2api-go/handlers"
	"cursor2api-go/middleware"
	"cursor2api-go/models"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
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

	// 设置日志级别和 GIN 模式（必须在创建路由器之前设置）
	if cfg.Debug {
		logrus.SetLevel(logrus.DebugLevel)
		gin.SetMode(gin.DebugMode)
	} else {
		logrus.SetLevel(logrus.InfoLevel)
		gin.SetMode(gin.ReleaseMode)
	}

	// 禁用 Gin 的调试信息输出
	gin.DisableConsoleColor()
	
	// 创建路由器（使用 gin.New() 而不是 gin.Default() 以避免默认日志）
	router := gin.New()

	// 添加中间件
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())
	router.Use(middleware.ErrorHandler())
	// 只在 Debug 模式下启用 GIN 的日志
	if cfg.Debug {
		router.Use(gin.Logger())
	}

	// 创建处理器
	handler := handlers.NewHandler(cfg)

	// 注册路由
	setupRoutes(router, handler)

	// 创建HTTP服务器
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Port),
		Handler: router,
	}

	// 打印启动信息
	printStartupBanner(cfg)

	// 启动服务器的goroutine
	go func() {
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

// printStartupBanner 打印启动横幅
func printStartupBanner(cfg *config.Config) {
	banner := `
╔══════════════════════════════════════════════════════════════╗
║                      Cursor2API Server                       ║
╚══════════════════════════════════════════════════════════════╝
`
	fmt.Println(banner)

	fmt.Printf("🚀 服务地址:  http://localhost:%d\n", cfg.Port)
	fmt.Printf("📚 API 文档:  http://localhost:%d/\n", cfg.Port)
	fmt.Printf("💊 健康检查:  http://localhost:%d/health\n", cfg.Port)
	fmt.Printf("🔑 API 密钥:  %s\n", maskAPIKey(cfg.APIKey))

	modelList := cfg.GetModels()
	fmt.Printf("\n🤖 支持模型 (%d 个):\n", len(modelList))

	// 按类别分组显示模型
	providers := make(map[string][]string)
	for _, modelID := range modelList {
		if config, exists := models.GetModelConfig(modelID); exists {
			providers[config.Provider] = append(providers[config.Provider], modelID)
		} else {
			providers["Other"] = append(providers["Other"], modelID)
		}
	}

	// 按Provider排序并显示
	for _, provider := range []string{"Anthropic", "OpenAI", "Google", "Other"} {
		if models, ok := providers[provider]; ok && len(models) > 0 {
			fmt.Printf("   %s:  %s\n", provider, strings.Join(models, ", "))
		}
	}

	if cfg.Debug {
		fmt.Println("\n🐛 调试模式:  已启用")
	}

	fmt.Println("\n✨ 服务已启动，按 Ctrl+C 停止")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
}

// maskAPIKey 掩码 API 密钥，只显示前 4 位
func maskAPIKey(key string) string {
	if len(key) <= 4 {
		return "****"
	}
	return key[:4] + "****"
}
