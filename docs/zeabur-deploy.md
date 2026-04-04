# Zeabur 一键部署指南

[English](#english) | 简体中文

本文档将指导你如何将 Cursor2API-Go 一键部署到 [Zeabur](https://zeabur.com) 平台。

## 📋 前提条件

1. 一个 [Zeabur 账号](https://zeabur.com)（免费注册即可）
2. Zeabur 付费计划（Dev 或 Team Plan，用于运行持久服务）

## 🚀 方法一：一键部署按钮（最简单）

直接点击下方按钮，即可跳转到 Zeabur 完成一键部署：

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/cursor2api-go)

### 部署步骤

1. **点击部署按钮** — 跳转到 Zeabur 模板部署页面
2. **填写配置参数**：
   - **Domain（域名）**：选择或输入你想绑定的域名（可使用 Zeabur 免费提供的 `*.zeabur.app` 域名）
   - **API Key**：设置 API 认证密钥（默认为 `0000`，**生产环境请务必修改**）
   - **Models**：基础模型列表，逗号分隔（默认为 `claude-sonnet-4.6`）
3. **选择区域** — 选择部署区域（建议选择离你最近的区域）
4. **确认部署** — 点击部署按钮，等待构建完成

部署通常在 2-5 分钟内完成。

## 🛠️ 方法二：使用 Zeabur CLI 部署

如果你偏好命令行操作：

### 1. 安装 Zeabur CLI

```bash
npm install -g zeabur
```

### 2. 登录

```bash
zeabur auth login
```

### 3. 使用模板部署

```bash
# 克隆项目
git clone https://github.com/jacob-sheng/cursor2api-go.git
cd cursor2api-go

# 使用模板文件部署
npx zeabur@latest template deploy -f zeabur-template.yaml
```

### 4. 使用 API 密钥部署（高级）

如果你有 Zeabur API 密钥，可以直接使用 API 进行部署：

```bash
# 设置 API 密钥
export ZEABUR_TOKEN=sk-your-api-key

# 部署模板
npx zeabur@latest template deploy -f zeabur-template.yaml
```

## 🔧 方法三：手动在 Zeabur Dashboard 部署

1. 登录 [Zeabur Dashboard](https://dash.zeabur.com)
2. 点击 **Create Project** 创建新项目
3. 选择部署区域
4. 点击 **Add Service** → **Git** → 连接你的 GitHub 账号
5. 选择 `cursor2api-go` 仓库
6. Zeabur 会自动检测 Dockerfile 并开始构建
7. 构建完成后，在服务设置中：
   - 添加自定义域名或使用 `*.zeabur.app` 域名
   - 设置环境变量

## ⚙️ 部署后配置

### 环境变量设置

部署完成后，在 Zeabur Dashboard 的服务设置中配置以下环境变量：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `PORT` | `8002` | 服务器端口（Zeabur 会自动处理端口映射） |
| `API_KEY` | `0000` | **⚠️ 务必修改！** API 认证密钥 |
| `MODELS` | `claude-sonnet-4.6` | 基础模型列表，逗号分隔 |
| `DEBUG` | `false` | 调试模式（生产环境建议关闭） |
| `TIMEOUT` | `60` | 请求超时时间（秒） |
| `KILO_TOOL_STRICT` | `false` | Kilo Code 兼容模式 |

### 域名绑定

1. 在 Zeabur Dashboard 中，进入你的服务
2. 点击 **Networking** 选项卡
3. 点击 **Generate Domain** 获取一个免费的 `*.zeabur.app` 域名
4. 或者点击 **Custom Domain** 绑定你自己的域名
   - 需要在你的 DNS 服务商处添加 CNAME 记录指向 Zeabur 提供的地址

### 验证部署

部署完成后，通过以下方式验证服务是否正常运行：

```bash
# 健康检查
curl https://your-domain.zeabur.app/health

# 获取模型列表
curl -H "Authorization: Bearer your-api-key" https://your-domain.zeabur.app/v1/models

# 测试聊天
curl -X POST https://your-domain.zeabur.app/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "claude-sonnet-4.6",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": false
  }'
```

## 📊 监控与日志

在 Zeabur Dashboard 中可以方便地查看：

- **日志**：实时查看服务日志输出
- **指标**：监控 CPU、内存使用情况
- **部署历史**：查看所有部署记录和回滚

## 🔄 更新部署

当 GitHub 仓库有新的 commit 推送时，Zeabur 会自动重新部署最新版本。

你也可以手动触发重新部署：
1. 进入 Zeabur Dashboard
2. 选择你的服务
3. 点击 **Redeploy**

## ❓ 常见问题

### Q: 部署失败怎么办？
A: 查看 Zeabur Dashboard 中的构建日志，常见原因包括：
- 内存不足：尝试升级到更高规格
- 构建超时：检查网络连接

### Q: 服务启动后无法访问？
A: 确认以下几点：
1. 是否已绑定域名
2. 端口配置是否正确（默认 8002）
3. 检查健康检查 `/health` 端点是否正常响应

### Q: 如何使用自定义域名？
A: 在 Zeabur Dashboard 的 Networking 设置中添加自定义域名，并在 DNS 添加 CNAME 记录。

---

<a id="english"></a>

# Zeabur One-Click Deployment Guide

English | [简体中文](#zeabur-一键部署指南)

This guide walks you through deploying Cursor2API-Go to [Zeabur](https://zeabur.com) with one click.

## 📋 Prerequisites

1. A [Zeabur account](https://zeabur.com) (free signup)
2. A Zeabur paid plan (Dev or Team Plan for persistent services)

## 🚀 Method 1: One-Click Deploy Button (Easiest)

Click the button below to deploy directly on Zeabur:

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/cursor2api-go)

### Steps

1. **Click the deploy button** — Redirects to the Zeabur template deployment page
2. **Fill in configuration**:
   - **Domain**: Choose or enter a domain (you can use Zeabur's free `*.zeabur.app` domain)
   - **API Key**: Set the API authentication key (default is `0000`, **change for production!**)
   - **Models**: Comma-separated base model list (default: `claude-sonnet-4.6`)
3. **Select region** — Choose a deployment region close to you
4. **Confirm deployment** — Click deploy and wait for the build to finish

Deployment usually completes in 2-5 minutes.

## 🛠️ Method 2: Deploy with Zeabur CLI

```bash
# Clone the project
git clone https://github.com/jacob-sheng/cursor2api-go.git
cd cursor2api-go

# Deploy using the template file
npx zeabur@latest template deploy -f zeabur-template.yaml
```

## ⚙️ Post-Deployment Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8002` | Server port (Zeabur handles port mapping) |
| `API_KEY` | `0000` | **⚠️ Change this!** API authentication key |
| `MODELS` | `claude-sonnet-4.6` | Base model list, comma-separated |
| `DEBUG` | `false` | Debug mode (disable in production) |
| `TIMEOUT` | `60` | Request timeout (seconds) |

### Verify Deployment

```bash
# Health check
curl https://your-domain.zeabur.app/health

# List models
curl -H "Authorization: Bearer your-api-key" https://your-domain.zeabur.app/v1/models
```
