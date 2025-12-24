# Cursor2API

[English](README_EN.md) | 简体中文

一个将 Cursor Web 转换为 OpenAI 兼容 API 的 Go 服务。完全兼容 OpenAI API 格式，支持本地运行。

[![Go Version](https://img.shields.io/badge/Go-1.21+-blue.svg)](https://golang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 功能特性

- ✅ 完全兼容 OpenAI API 格式
- ✅ 支持流式和非流式响应
- ✅ 支持 23 种先进 AI 模型
- ✅ 高性能 Go 语言实现
- ✅ 自动处理 Cursor Web 认证
- ✅ 简洁的 Web 界面

## 🤖 支持的模型 (23个)

- **OpenAI 系列**: gpt-5.1, gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano, gpt-4.1, gpt-4o, o3, o4-mini
- **Claude 系列**: claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet, claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus
- **Gemini 系列**: gemini-2.5-pro, gemini-2.5-flash, gemini-3.0-pro
- **其他模型**: deepseek-r1, deepseek-v3.1, kimi-k2-instruct, grok-3

## 🚀 快速开始

### 环境要求

- Go 1.21+
- Node.js 18+ (用于 JavaScript 执行)

### 安装和运行

**Linux/macOS**:
```bash
git clone https://github.com/yourusername/cursor2api-go.git
cd cursor2api-go
chmod +x start.sh
./start.sh
```

**Windows**:
```batch
# 双击运行或在 cmd 中执行
start-go.bat

# 或在 Git Bash / Windows Terminal 中
./start-go-utf8.bat
```

服务将在 `http://localhost:8002` 启动

## 📡 API 使用

### 获取模型列表

```bash
curl -H "Authorization: Bearer 0000" http://localhost:8002/v1/models
```

### 非流式聊天

```bash
curl -X POST http://localhost:8002/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0000" \
  -d '{
    "model": "claude-4.5-sonnet",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": false
  }'
```

### 流式聊天

```bash
curl -X POST http://localhost:8002/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0000" \
  -d '{
    "model": "claude-4.5-sonnet",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'
```

### 在第三方应用中使用

在任何支持自定义 OpenAI API 的应用中（如 ChatGPT Next Web、Lobe Chat 等）：

1. **API 地址**: `http://localhost:8002`
2. **API 密钥**: `0000`（或自定义）
3. **模型**: 选择支持的模型之一

## ⚙️ 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `PORT` | `8002` | 服务器端口 |
| `DEBUG` | `true` | 调试模式 |
| `API_KEY` | `0000` | API 认证密钥 |
| `MODELS` | 见 `.env.example` | 支持的模型列表（逗号分隔） |
| `TIMEOUT` | `30` | 请求超时时间（秒） |

### 故障排除

遇到问题？查看 **[故障排除指南](TROUBLESHOOTING.md)** 了解常见问题的解决方案，包括：
- 403 Access Denied 错误
- Token 获取失败
- 连接超时
- Cloudflare 拦截


### Windows 启动脚本说明

项目提供两个 Windows 启动脚本：

- **`start-go.bat`** (推荐): GBK 编码，完美兼容 Windows cmd.exe
- **`start-go-utf8.bat`**: UTF-8 编码，适用于 Git Bash、PowerShell、Windows Terminal

两个脚本功能完全相同，仅显示样式不同。如遇乱码请使用 `start-go.bat`。

## 🧪 开发

### 运行测试

```bash
# 运行现有测试
go test ./...
```

### 构建项目

```bash
# 构建可执行文件
go build -o cursor2api-go

# 交叉编译 (例如 Linux)
GOOS=linux GOARCH=amd64 go build -o cursor2api-go-linux
```

## 📁 项目结构

```
cursor2api-go/
├── main.go              # 主程序入口
├── config/              # 配置管理
├── handlers/            # HTTP 处理器
├── services/            # 业务服务层
├── models/              # 数据模型
├── utils/               # 工具函数
├── middleware/          # 中间件
├── jscode/              # JavaScript 代码
├── static/              # 静态文件
├── start.sh             # Linux/macOS 启动脚本
├── start-go.bat         # Windows 启动脚本 (GBK)
├── start-go-utf8.bat    # Windows 启动脚本 (UTF-8)
└── README.md            # 项目说明
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- 使用 `gofmt` 格式化代码
- 使用 `go vet` 检查代码
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/) 规范

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## ⚠️ 免责声明

本项目仅供学习和研究使用，请勿用于商业用途。使用本项目时请遵守相关服务的使用条款。

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！