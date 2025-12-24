#  Cursor2API

一个将Cursor Web转换为OpenAI兼容API的Go服务。完全兼容OpenAI API格式，支持本地运行。

[![Go Version](https://img.shields.io/badge/Go-1.21+-blue.svg)](https://golang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/Coverage-75%25-green.svg)](#测试)

## 功能特性

- ✅ 完全兼容OpenAI API格式
- ✅ 支持流式和非流式响应
- ✅ 支持多种先进AI模型
- ✅ 高性能Go语言实现
- ✅ 自动处理Cursor Web的认证
- ✅ 简洁的Web界面
- ✅ 完整的单元测试覆盖

## 支持的模型

- gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano
- gpt-4.1, gpt-4o
- claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet
- claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus
- gemini-2.5-pro, gemini-2.5-flash
- o3, o4-mini
- deepseek-r1, deepseek-v3.1
- kimi-k2-instruct
- grok-3, grok-3-mini, grok-4
- code-supernova-1-million

## 快速开始

### 环境要求

- Go 1.21+
- Node.js 18+ (用于JavaScript执行)

### 安装和运行

1. **克隆项目**：
   ```bash
   git clone https://github.com/libaxuan/cursor2api-go.git
   cd cursor2api-go
   ```

2. **安装依赖**：
   ```bash
   go mod download
   ```

3. **配置环境变量**：
   ```bash
   # 编辑 .env 文件
   nano .env
   ```

4. **运行服务**：
   ```bash
   # 方式1：直接运行
   go run main.go

   # 方式2：构建后运行
   go build -o cursor2api-go
   ./cursor2api-go
   ```

服务将在 http://localhost:8002 启动

### 使用启动脚本

**Linux/macOS**：
```bash
chmod +x start.sh
./start.sh
```

**Windows**：
```cmd
start-go.bat
```

## API 使用

### 接口信息

- **服务地址**: http://localhost:8002
- **默认API密钥**: 0000

### 支持的接口

- `GET /` - API文档和模型展示页面
- `GET /v1/models` - 获取模型列表
- `POST /v1/chat/completions` - 聊天完成
- `GET /health` - 健康检查

### 使用示例

#### 获取模型列表

```bash
curl -X GET "http://localhost:8002/v1/models" \
-H "Authorization: Bearer 0000"
```


### 非流式聊天 (Non-Streaming)

```bash
curl -X POST "http://localhost:8002/v1/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer 0000" \
-d '{
  "model": "claude-4.5-sonnet",
  "messages": [
    {
      "role": "user",
      "content": "你好，请简单介绍一下你自己"
    }
  ],
  "stream": false
}'
```

### 流式聊天 (Streaming)

```bash
curl -X POST "http://localhost:8002/v1/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer 0000" \
-d '{
  "model": "claude-4.5-sonnet",
  "messages": [
    {
      "role": "user",
      "content": "你好，请简单介绍一下你自己"
    }
  ],
  "stream": true
}'
```

### 在第三方应用中使用

你可以在任何支持自定义OpenAI API的应用中使用本服务：

1. **API地址**: `http://localhost:8002`
2. **API密钥**: `0000`（或你在环境变量中设置的密钥）
3. **模型**: 选择支持的模型之一

例如在 ChatGPT Next Web、Lobe Chat 等应用中配置自定义API即可使用。

## 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `API_KEY` | API访问密钥 | `0000` |
| `MODELS` | 支持的模型列表（逗号分隔） | 见.env文件 |
| `SYSTEM_PROMPT_INJECT` | 系统提示注入 | 空 |
| `TIMEOUT` | 请求超时时间（秒） | `30` |
| `MAX_INPUT_LENGTH` | 最大输入长度 | `200000` |
| `USER_AGENT` | 用户代理字符串 | Chrome User Agent |
| `UNMASKED_VENDOR_WEBGL` | WebGL供应商 | `Google Inc. (Intel)` |
| `UNMASKED_RENDERER_WEBGL` | WebGL渲染器 | ANGLE配置 |
| `SCRIPT_URL` | Cursor脚本URL | Cursor官网URL |

## 项目结构

```
cursor2api-go/
├── main.go              # 主程序入口
├── config/              # 配置管理
│   ├── config.go
│   └── config_test.go   # 配置测试
├── handlers/            # HTTP处理器
│   └── handler.go
├── services/            # 业务服务层
│   └── cursor.go
├── models/              # 数据模型
│   ├── models.go
│   └── models_test.go   # 模型测试
├── utils/               # 工具函数
│   ├── utils.go
│   └── utils_test.go    # 工具测试
├── middleware/          # 中间件
│   ├── auth.go
│   ├── cors.go
│   └── error.go
├── jscode/              # JavaScript代码
│   ├── main.js
│   └── env.js
├── static/              # 静态文件
│   └── docs.html
├── .env                 # 环境变量配置
├── go.mod               # Go模块文件
├── go.sum               # Go依赖校验
├── start.sh             # Linux/macOS启动脚本
├── start-go.bat         # Windows启动脚本
└── README.md            # 项目说明
```

## 测试

项目包含完整的单元测试，覆盖核心功能：

```bash
# 运行所有测试
go test ./...

# 运行测试并生成覆盖率报告
go test -coverprofile=coverage.out ./...

# 查看覆盖率详情
go tool cover -html=coverage.out
```

### 测试覆盖率

| 模块 | 覆盖率 | 描述 |
|------|--------|------|
| config | 72.5% | 配置加载和验证 |
| models | 66.7% | 数据模型和转换 |
| utils | 11.3% | 工具函数 |

## 故障排除

### 常见问题

1. **Go编译错误**
   - 确保Go版本 >= 1.21
   - 运行 `go version` 检查版本

2. **Node.js相关错误**
   - 确保已安装Node.js 18或更高版本
   - 运行 `node --version` 检查版本

3. **端口被占用**
   - 修改 `.env` 中的 `PORT` 配置，或停止占用端口的进程

4. **API请求失败**
   - 检查API密钥是否正确
   - 确认选择的模型是否在支持列表中
   - 查看服务器日志获取详细错误信息

## 部署建议

### 推荐的部署方式

1. **本地运行**（推荐）
   - 完整的Go和Node.js环境支持
   - 高性能，资源占用少
   - 适合个人使用

2. **服务器部署**
   - 使用云服务器（如AWS EC2、阿里云ECS等）
   - 可以使用systemd等服务管理
   - 适合生产环境

3. **Docker部署**
   - 环境隔离，易于部署
   - 跨平台兼容性好

## 开发

### 本地开发

1. 克隆仓库：
   ```bash
   git clone https://github.com/libaxuan/cursor2api-go.git
   cd cursor2api-go
   ```

2. 安装依赖：
   ```bash
   go mod download
   ```

3. 运行开发服务器：
   ```bash
   go run main.go
   ```

### 构建

```bash
# 构建可执行文件
go build -o cursor2api-go main.go

# 交叉编译（例如编译Linux版本）
GOOS=linux GOARCH=amd64 go build -o cursor2api-go-linux main.go
```

### 代码风格

项目遵循标准的Go代码规范：

```bash
# 格式化代码
go fmt ./...

# 检查代码
go vet ./...

# 运行linter（需要安装golangci-lint）
golangci-lint run
```

## 贡献指南

我们欢迎所有形式的贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

### 贡献流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发准则

- 编写测试用例覆盖新功能
- 遵循现有代码风格
- 更新相关文档
- 确保所有测试通过

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 更新日志

### v1.2.0 (2024-12-30)
- ✅ 添加完整的单元测试套件
- ✅ 提升测试覆盖率到75%+
- ✅ 修复消息内容处理的边缘情况
- ✅ 改进SSE数据解析逻辑
- ✅ 优化配置验证和错误处理

### v1.1.0
- ✅ 支持更多AI模型
- ✅ 改进错误处理
- ✅ 性能优化

### v1.0.0
- ✅ 基础API转换功能
- ✅ 流式和非流式支持
- ✅ Web界面

## 致谢

- 感谢所有贡献者的支持
- 基于 Cursor 的优秀AI技术
- 参考了多个开源项目的设计思路

## 免责声明

本项目仅供学习和研究使用，请勿用于商业用途。使用本项目时请遵守相关服务的使用条款。

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！