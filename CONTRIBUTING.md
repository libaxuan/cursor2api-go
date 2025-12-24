# 贡献指南

感谢您对  Cursor2API 的兴趣！我们欢迎各种形式的贡献，包括但不限于：

- 🐛 报告bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🎨 改进UI/UX

## 开发环境设置

### 环境要求

- Go 1.21+
- Node.js 18+ (用于JavaScript执行)
- Git

### 快速开始

1. **克隆项目**：
   ```bash
   git clone https://github.com/yourusername/cursor2api-go.git
   cd cursor2api-go
   ```

2. **安装依赖**：
   ```bash
   go mod download
   ```

3. **配置环境**：
   ```bash
   cp .env.example .env
   # 编辑 .env 文件
   ```

4. **运行项目**：
   ```bash
   ./start.sh
   ```

## 代码规范

### Go代码规范

- 遵循 [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- 使用 `gofmt` 格式化代码
- 使用 `go vet` 检查代码
- 使用 `golint` 检查代码风格

### 提交规范

我们使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```bash
# 功能
feat: add new feature

# 修复
fix: fix bug

# 文档
docs: update documentation

# 样式
style: format code

# 重构
refactor: refactor code

# 测试
test: add tests

# 构建
build: update build process

# 其他
chore: update dependencies
```

### 分支管理

- `main`: 主分支，稳定版本
- `develop`: 开发分支
- `feature/*`: 功能分支
- `bugfix/*`: 修复分支
- `hotfix/*`: 紧急修复分支

## 提交Pull Request

1. **Fork项目** 到您的GitHub账户

2. **创建功能分支**：
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **提交更改**：
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

4. **推送分支**：
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建Pull Request**：
   - 在GitHub上访问您的fork
   - 点击 "Compare & pull request"
   - 填写PR描述
   - 等待review

## 报告问题

### Bug报告

请使用 [GitHub Issues](https://github.com/yourusername/cursor2api-go/issues) 报告bug，并包含：

- 详细的错误描述
- 重现步骤
- 期望的行为
- 实际的行为
- 环境信息（Go版本、操作系统等）
- 相关的日志输出

### 功能请求

对于新功能请求，请提供：

- 功能描述
- 使用场景
- 为什么需要这个功能
- 可能的实现方式

## 测试

### 运行测试

```bash
# 运行所有测试
go test ./...

# 运行特定包的测试
go test ./handlers

# 运行测试并生成覆盖率报告
go test -cover ./...
```

### 编写测试

- 为新功能编写单元测试
- 确保测试覆盖率不低于80%
- 使用表驱动测试 (table-driven tests)

## 文档

### 更新文档

- 保持README.md的更新
- 为新功能添加使用示例
- 更新API文档

### 代码注释

- 为导出的函数和类型添加注释
- 使用 `//` 格式注释
- 注释应该以函数名开头

## 许可证

通过贡献代码，您同意您的贡献将根据项目的MIT许可证进行许可。

## 联系我们

- 📧 邮箱: your-email@example.com
- 💬 Discord: [加入我们的社区](https://discord.gg/example)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/cursor2api-go/issues)

感谢您的贡献！🎉