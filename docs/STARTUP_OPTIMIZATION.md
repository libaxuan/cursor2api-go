# 启动日志优化说明

## 优化前 vs 优化后

### 优化前（调试模式）
启动时会显示大量 GIN 框架的调试信息：
```
[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /health                   --> main.setupRoutes.func1 (5 handlers)
[GIN-debug] GET    /                         --> cursor2api-go/handlers.(*Handler).ServeDocs-fm (5 handlers)
[GIN-debug] GET    /v1/models                --> cursor2api-go/handlers.(*Handler).ListModels-fm (6 handlers)
[GIN-debug] POST   /v1/chat/completions      --> cursor2api-go/handlers.(*Handler).ChatCompletions-fm (6 handlers)
[GIN-debug] GET    /static/*filepath         --> github.com/gin-gonic/gin.(*RouterGroup).createStaticHandler.func1 (5 handlers)
[GIN-debug] HEAD   /static/*filepath         --> github.com/gin-gonic/gin.(*RouterGroup).createStaticHandler.func1 (5 handlers)
INFO[0000] Starting Cursor2API server on port 8002
```

### 优化后（简洁模式，默认）
启动时只显示必要的服务信息：
```
╔══════════════════════════════════════════════════════════════╗
║                      Cursor2API Server                       ║
╚══════════════════════════════════════════════════════════════╝

🚀 服务地址:  http://localhost:8002
📚 API 文档:  http://localhost:8002/
💊 健康检查:  http://localhost:8002/health
🔑 API 密钥:  0000
🤖 支持模型:  gpt-5.1 等 23 个模型

✨ 服务已启动，按 Ctrl+C 停止
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 主要改进

### 1. 默认使用简洁模式
- 修改 `.env.example` 中 `DEBUG=false`
- 生产环境默认不显示调试信息
- 启动输出更清爽、专业

### 2. 美观的启动横幅
- 使用 Unicode 框线字符绘制横幅
- 使用 Emoji 图标增强可读性
- 清晰展示关键信息：
  - 🚀 服务地址
  - 📚 API 文档
  - 💊 健康检查
  - 🔑 API 密钥
  - 🤖 支持的模型

### 3. 条件性日志输出
- 只在 `DEBUG=true` 时显示详细日志
- GIN 的 Logger 中间件仅在调试模式启用
- 减少生产环境的日志噪音

### 4. 智能模型显示
- 模型数量 > 3 时，只显示第一个和总数
- 避免启动信息过长
- 保持输出简洁

## 代码改进

### main.go
```go
// 设置日志级别和 GIN 模式
if cfg.Debug {
    logrus.SetLevel(logrus.DebugLevel)
    gin.SetMode(gin.DebugMode)
} else {
    logrus.SetLevel(logrus.InfoLevel)
    gin.SetMode(gin.ReleaseMode)
}

// 只在 Debug 模式下启用 GIN 的日志
if cfg.Debug {
    router.Use(gin.Logger())
}

// 打印启动信息
printStartupBanner(cfg)
```

### printStartupBanner 函数
```go
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
    fmt.Printf("🔑 API 密钥:  %s\n", cfg.APIKey)
    
    models := cfg.GetModels()
    if len(models) > 3 {
        fmt.Printf("🤖 支持模型:  %s 等 %d 个模型\n", models[0], len(models))
    } else {
        fmt.Printf("🤖 支持模型:  %v\n", models)
    }
    
    if cfg.Debug {
        fmt.Println("🐛 调试模式:  已启用")
    }
    
    fmt.Println("\n✨ 服务已启动，按 Ctrl+C 停止")
    fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
}
```

## 使用方法

### 简洁模式（默认）
```bash
./cursor2api-go
```

或者使用启动脚本：
```bash
./start.sh
```

### 调试模式

**方式 1**: 修改 `.env` 文件
```bash
DEBUG=true
```

**方式 2**: 临时启用
```bash
DEBUG=true ./cursor2api-go
```

### 调试模式会显示
- ✅ 详细的 GIN 路由信息
- ✅ 每个请求的详细日志
- ✅ x-is-human token 信息
- ✅ 浏览器指纹配置
- ✅ 重试和错误处理详情

## 优势

1. **更专业** - 简洁的输出适合生产环境
2. **更清晰** - 关键信息一目了然
3. **更美观** - 使用 Unicode 和 Emoji 增强视觉效果
4. **更灵活** - 可以随时切换调试模式
5. **更友好** - 新用户更容易理解服务状态

## 兼容性

- ✅ 完全向后兼容
- ✅ 不影响现有功能
- ✅ 可以随时切换模式
- ✅ 支持所有平台（Windows/macOS/Linux）

## 注意事项

1. **首次使用**: 需要更新 `.env` 文件（或删除后重新生成）
2. **调试问题**: 遇到问题时，建议启用 `DEBUG=true` 查看详细日志
3. **生产部署**: 建议使用 `DEBUG=false` 以获得最佳性能和简洁输出
