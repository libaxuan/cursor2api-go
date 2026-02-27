# Cursor2API

[English](README_EN.md) | 简体中文

一个将 Cursor Web 转换为 OpenAI 兼容 API 的服务。提供 Go 和 Cloudflare Workers 两种实现版本。

[![Go Version](https://img.shields.io/badge/Go-1.24+-blue.svg)](https://golang.org)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange.svg)](https://workers.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 版本选择

本项目提供两个版本，你可以根据需求选择：

| 版本 | 部署方式 | 性能 | 成本 | 适用场景 |
|------|---------|------|------|---------|
| **Go 版本** | 本地/服务器 | ⭐⭐⭐⭐⭐ | 服务器费用 | 需要高性能、稳定运行 |
| **Workers 版本** | Cloudflare | ⭐⭐⭐ | 免费额度充足 | 快速部署、全球加速 |

- 🚀 **Go 版本**: 适合需要高性能和稳定性的场景，可部署在任何支持 Go 的服务器上
- ☁️ **Workers 版本**: 适合快速部署和全球访问，利用 Cloudflare 的边缘网络，免费额度充足

### 快速导航

- **Go 版本**: 继续阅读本文档
- **Workers 版本**: 查看 [`cf/README.md`](cf/README.md) 或 [`cf/DEPLOYMENT.md`](cf/DEPLOYMENT.md)

## ✨ 功能特性

- ✅ 完全兼容 OpenAI API 格式
- ✅ 支持流式和非流式响应
- ✅ 高性能 Go 语言实现
- ✅ 自动处理 Cursor Web 认证
- ✅ 简洁的 Web 界面

## 🤖 支持的模型

- **Anthropic Claude**: claude-sonnet-4.6

## 🚀 快速开始

### 环境要求

- Go 1.24+
- Node.js 18+ (用于 JavaScript 执行)

### 安装和运行

**Linux/macOS**:
```bash
git clone https://github.com/libaxuan/cursor2api-go.git
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
    "model": "claude-sonnet-4.6",
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
    "model": "claude-sonnet-4.6",
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
| `DEBUG` | `false` | 调试模式（启用后显示详细日志和路由信息） |
| `API_KEY` | `0000` | API 认证密钥 |
| `MODELS` | `claude-sonnet-4.6` | 支持的模型列表（逗号分隔） |
| `TIMEOUT` | `60` | 请求超时时间（秒） |

### 调试模式

默认情况下，服务以简洁模式运行。如需启用详细日志：

**方式 1**: 修改 `.env` 文件
```bash
DEBUG=true
```

**方式 2**: 使用环境变量
```bash
DEBUG=true ./cursor2api-go
```

调试模式会显示：
- 详细的 GIN 路由信息
- 每个请求的详细日志
- x-is-human token 信息
- 浏览器指纹配置

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
├── main.go              # 主程序入口 (Go 版本)
├── config/              # 配置管理 (Go 版本)
├── handlers/            # HTTP 处理器 (Go 版本)
├── services/            # 业务服务层 (Go 版本)
├── models/              # 数据模型 (Go 版本)
├── utils/               # 工具函数 (Go 版本)
├── middleware/          # 中间件 (Go 版本)
├── jscode/              # JavaScript 代码 (Go 版本)
├── static/              # 静态文件 (Go 版本)
├── start.sh             # Linux/macOS 启动脚本
├── start-go.bat         # Windows 启动脚本 (GBK)
├── start-go-utf8.bat    # Windows 启动脚本 (UTF-8)
├── cf/                  # Cloudflare Workers 版本
│   ├── src/             # 源代码
│   │   ├── index.ts     # 主入口
│   │   ├── config.ts    # 配置管理
│   │   ├── cursor-service.ts  # Cursor API 服务
│   │   ├── handlers.ts  # 路由处理器
│   │   ├── middleware.ts # 中间件
│   │   ├── utils.ts     # 工具函数
│   │   └── js-executor.ts # JavaScript 执行器
│   ├── wrangler.toml    # Cloudflare Workers 配置
│   ├── package.json     # 项目依赖
│   ├── tsconfig.json    # TypeScript 配置
│   ├── README.md        # Workers 版本说明
│   └── DEPLOYMENT.md    # 部署指南
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