# Cursor2API - Go版本

🚀 这是Cursor2API项目的Go语言实现版本，提供与OpenAI API兼容的接口来访问Cursor AI服务。

## ✨ 特性

- 🔄 **OpenAI兼容API** - 完全兼容OpenAI的API格式
- 🌊 **流式响应支持** - 支持Server-Sent Events (SSE)流式响应
- 🔐 **Bearer Token认证** - 安全的API密钥认证机制
- 🌍 **CORS支持** - 内置跨域资源共享支持
- 📊 **多模型支持** - 支持多种AI模型
- 🛡️ **错误处理** - 完善的错误处理和日志记录
- ⚡ **高性能** - Go语言原生性能优势
- 📱 **健康检查** - 内置健康检查端点

## 🏗️ 项目结构

```
cursor2api-go/
├── config/          # 配置管理
├── models/          # 数据模型定义
├── handlers/        # HTTP请求处理器
├── services/        # 业务逻辑服务
├── middleware/      # 中间件（认证、CORS、错误处理）
├── utils/           # 工具函数
├── static/          # 静态文件
├── main.go          # 程序入口
└── go.mod           # Go模块定义
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/cursor2api-go.git
cd cursor2api-go
```

### 2. 安装依赖

```bash
go mod download
```

### 3. 配置环境变量

创建 `.env` 文件：

```env
# 服务器配置
PORT=8002
DEBUG=false

# API配置
API_KEY=your-secret-api-key
MODELS=gpt-5,gpt-5-codex,gpt-5-mini,gpt-5-nano,gpt-4.1,gpt-4o,claude-3.5-sonnet,claude-3.5-haiku,claude-3.7-sonnet,claude-4-sonnet,claude-4.5-sonnet,claude-4-opus,claude-4.1-opus,gemini-2.5-pro,gemini-2.5-flash,o3,o4-mini,deepseek-r1,deepseek-v3.1,kimi-k2-instruct,grok-3,grok-3-mini,grok-4,code-supernova-1-million
SYSTEM_PROMPT_INJECT=

# 请求配置
TIMEOUT=30
USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36

# Cursor配置
SCRIPT_URL=https://cursor.com/_next/static/chunks/pages/_app.js
```

### 4. 启动服务

```bash
# 开发模式
go run main.go

# 编译并运行
go build -o cursor2api-go
./cursor2api-go
```

服务将在 `http://localhost:8002` 启动

## 📡 API端点

### 获取模型列表

```bash
curl -X GET "http://localhost:8002/v1/models" \
  -H "Authorization: Bearer your-api-key"
```

### 聊天完成（非流式）

```bash
curl -X POST "http://localhost:8002/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'
```

### 聊天完成（流式）

```bash
curl -X POST "http://localhost:8002/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "content": "Tell me a story"}
    ],
    "stream": true
  }'
```

### 健康检查

```bash
curl -X GET "http://localhost:8002/health"
```

## 🐳 Docker部署

### 构建镜像

```bash
docker build -t cursor2api-go .
```

### 运行容器

```bash
docker run -d \
  --name cursor2api \
  -p 8002:8002 \
  -e API_KEY=your-secret-key \
  cursor2api-go
```

## 🔧 配置参数

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `PORT` | `8002` | 服务器端口 |
| `DEBUG` | `false` | 调试模式 |
| `API_KEY` | `0000` | API认证密钥 |
| `MODELS` | `gpt-5,gpt-4o,claude-3.5-sonnet...` | 支持的模型列表(24个) |
| `TIMEOUT` | `30` | 请求超时时间（秒） |
| `SYSTEM_PROMPT_INJECT` | `` | 系统提示注入 |

## 🧪 测试

```bash
# 运行所有测试
go test ./...

# 运行特定包的测试
go test ./models
go test ./handlers

# 带覆盖率测试
go test -cover ./...
```

## 📊 监控和日志

项目使用 `logrus` 进行结构化日志记录：

```bash
# 查看日志（如果使用systemd）
journalctl -u cursor2api-go -f

# 直接运行时的日志级别
DEBUG=true go run main.go
```

## 🔒 安全考虑

1. **API密钥**: 请使用强密码作为API_KEY
2. **HTTPS**: 生产环境建议使用HTTPS
3. **限流**: 考虑添加请求限流中间件
4. **防火墙**: 只开放必要的端口

## 🔄 从Python版本迁移

如果你正在从Python版本迁移，主要差异：

1. **性能**: Go版本具有更好的并发性能
2. **内存**: 更低的内存占用
3. **部署**: 单一二进制文件，更容易部署
4. **配置**: 环境变量配置保持兼容

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [Python版本](https://github.com/original/cursor2api)
- [OpenAI API文档](https://platform.openai.com/docs/api-reference)
- [Cursor AI](https://cursor.com/)

## ❓ 常见问题

### Q: 如何更换API密钥？
A: 修改环境变量 `API_KEY` 并重启服务

### Q: 支持哪些模型？
A: 支持24个主流AI模型，包括：
- **OpenAI系列**: gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano, gpt-4.1, gpt-4o, o3, o4-mini
- **Claude系列**: claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet, claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus
- **Gemini系列**: gemini-2.5-pro, gemini-2.5-flash
- **其他模型**: deepseek-r1, deepseek-v3.1, kimi-k2-instruct, grok-3, grok-3-mini, grok-4, code-supernova-1-million

### Q: 如何启用调试模式？
A: 设置环境变量 `DEBUG=true`

### Q: 遇到连接错误怎么办？
A: 检查网络连接和Cursor服务状态，查看日志获取详细错误信息

---

🎉 **享受使用Cursor2API的Go版本！** 如有问题，请提交Issue或参与讨论。