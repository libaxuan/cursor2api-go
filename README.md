# Cursor2API

[English](README_EN.md) | 简体中文

一个将 Cursor Web 转换为 OpenAI `chat/completions` 兼容 API 的 Go 服务。

[![Go Version](https://img.shields.io/badge/Go-1.24+-blue.svg)](https://golang.org)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-orange.svg)](https://polyformproject.org/licenses/noncommercial/1.0.0/)
[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/FOFRHZ)

## ✨ 特性

- 🔄 **API 兼容**: 兼容 OpenAI `chat/completions` 接口
- ⚡ **高性能**: 低延迟响应
- 🔐 **安全认证**: 支持 API Key 认证
- 🌐 **模型派生**: 自动暴露 `*-thinking` 模型
- 🧰 **工具调用**: 支持 `tools` / `tool_choice` / `tool_calls`
- 🛡️ **错误处理**: 完善的错误处理机制
- 📊 **健康检查**: 内置健康检查接口

## 🖼️ 效果图

![首页预览](docs/images/home.png)
![调用效果预览 1](docs/images/play1.png)
![调用效果预览 2](docs/images/play2.png)

## 🤖 支持的模型

- **Google Gemini**: `gemini-3-flash`
- **自动派生 thinking 模型**: `gemini-3-flash-thinking`

## 🚀 快速开始

### 环境要求

- Go 1.24+
- Node.js 18+ (用于 JavaScript 执行)

### 本地运行方式

#### 方法一：直接运行（推荐用于开发）

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

#### 方法二：手动编译运行

```bash
# 克隆项目
git clone https://github.com/libaxuan/cursor2api-go.git
cd cursor2api-go

# 下载依赖
go mod tidy

# 编译
go build -o cursor2api-go

# 运行
./cursor2api-go
```

#### 方法三：使用 go run

```bash
git clone https://github.com/libaxuan/cursor2api-go.git
cd cursor2api-go
go run main.go
```

服务将在 `http://localhost:8002` 启动

## 🚀 服务器部署方式

### Zeabur 一键部署（推荐）

点击下方按钮即可一键部署到 Zeabur：

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/cursor2api-go)

或者使用 Zeabur CLI 部署：
```bash
npx zeabur@latest template deploy -f zeabur-template.yaml
```

详细部署指南请参考 [Zeabur 部署文档](docs/zeabur-deploy.md)。

---

### Docker 部署

1. **构建镜像**:
```bash
# 构建镜像
docker build -t cursor2api-go .
```

2. **运行容器**:
```bash
# 运行容器（推荐）
docker run -d \
  --name cursor2api-go \
  --restart unless-stopped \
  -p 8002:8002 \
  -e API_KEY=your-secret-key \
  -e DEBUG=false \
  cursor2api-go

# 或者使用默认配置运行
docker run -d --name cursor2api-go --restart unless-stopped -p 8002:8002 cursor2api-go
```

### Docker Compose 部署（推荐用于生产环境）

1. **使用 docker-compose.yml**:
```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f
```

2. **自定义配置**:
修改 `docker-compose.yml` 文件中的环境变量以满足您的需求：
- 修改 `API_KEY` 为安全的密钥
- 根据需要调整 `MODELS`、`TIMEOUT` 等配置
- 更改暴露的端口

### 系统服务部署（Linux）

1. **编译并移动二进制文件**:
```bash
go build -o cursor2api-go
sudo mv cursor2api-go /usr/local/bin/
sudo chmod +x /usr/local/bin/cursor2api-go
```

2. **创建系统服务文件** `/etc/systemd/system/cursor2api-go.service`:
```ini
[Unit]
Description=Cursor2API Service
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/home/your-user/cursor2api-go
ExecStart=/usr/local/bin/cursor2api-go
Restart=always
Environment=API_KEY=your-secret-key
Environment=PORT=8002

[Install]
WantedBy=multi-user.target
```

3. **启动服务**:
```bash
# 重载 systemd 配置
sudo systemctl daemon-reload

# 启用开机自启
sudo systemctl enable cursor2api-go

# 启动服务
sudo systemctl start cursor2api-go

# 查看状态
sudo systemctl status cursor2api-go
```

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
    "model": "gemini-3-flash",
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
    "model": "gemini-3-flash",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'
```

### 带工具的请求

```bash
curl -X POST http://localhost:8002/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0000" \
  -d '{
    "model": "gemini-3-flash",
    "messages": [{"role": "user", "content": "帮我查询北京天气"}],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "获取实时天气",
          "parameters": {
            "type": "object",
            "properties": {
              "city": {"type": "string"}
            },
            "required": ["city"]
          }
        }
      }
    ]
  }'
```

### `-thinking` 模型

```bash
curl -X POST http://localhost:8002/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0000" \
  -d '{
    "model": "gemini-3-flash-thinking",
    "messages": [{"role": "user", "content": "先思考再决定要不要用工具"}],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "lookup",
          "parameters": {
            "type": "object",
            "properties": {
              "q": {"type": "string"}
            },
            "required": ["q"]
          }
        }
      }
    ],
    "stream": true
  }'
```

### 在第三方应用中使用

在任何支持自定义 OpenAI API 的应用中（如 ChatGPT Next Web、Lobe Chat 等）：

1. **API 地址**: `http://localhost:8002`
2. **API 密钥**: `0000`（或自定义）
3. **模型**: 选择支持的模型之一；基础模型会自动有对应的 `-thinking` 版本

## ⚙️ 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `PORT` | `8002` | 服务器端口 |
| `DEBUG` | `false` | 调试模式（启用后显示详细日志和路由信息） |
| `API_KEY` | `0000` | API 认证密钥 |
| `MODELS` | `gemini-3-flash` | 基础模型列表（逗号分隔），服务会自动追加对应的 `-thinking` 公开模型 |
| `TIMEOUT` | `60` | 请求超时时间（秒） |
| `KILO_TOOL_STRICT` | `false` | Kilo Code 兼容开关：当请求提供 `tools` 且 `tool_choice=auto` 时，将其提升为“必须至少调用一次工具” |

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

## 🧩 与 Kilo Code / Agent 编排器的兼容性

部分编排器会在“提供了 tools”时强制模型必须产出工具调用，否则报类似 `MODEL_NO_TOOLS_USED` 的错误。为改善这一类兼容问题：

- **建议**：在 `.env` 中启用 `KILO_TOOL_STRICT=true`
- **非流式补救**：当请求提供 `tools` 且被判定为“必须用工具”（`tool_choice=required/指定函数`，或启用 `KILO_TOOL_STRICT`）时，如果本轮没有产出 `tool_calls`，服务会自动 **重试 1 次**（仅非流式；流式不重试）


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

本项目采用 [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/) 许可证。
禁止商业用途。查看 [LICENSE](LICENSE) 文件了解详情。

## ⚠️ 免责声明

使用本项目时请遵守相关服务的使用条款。

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
