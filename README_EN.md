# Cursor2API

English | [简体中文](README.md)

A Go service that converts Cursor Web to OpenAI-compatible API. Fully compatible with OpenAI API format, supports local deployment.

[![Go Version](https://img.shields.io/badge/Go-1.21+-blue.svg)](https://golang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- ✅ Fully compatible with OpenAI API format
- ✅ Supports streaming and non-streaming responses
- ✅ Supports 23 advanced AI models
- ✅ High-performance Go implementation
- ✅ Automatic Cursor Web authentication
- ✅ Clean web interface

## 🤖 Supported Models (23)

- **OpenAI Series**: gpt-5.1, gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano, gpt-4.1, gpt-4o, o3, o4-mini
- **Claude Series**: claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet, claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus
- **Gemini Series**: gemini-2.5-pro, gemini-2.5-flash, gemini-3.0-pro
- **Other Models**: deepseek-r1, deepseek-v3.1, kimi-k2-instruct, grok-3

## 🚀 Quick Start

### Requirements

- Go 1.21+
- Node.js 18+ (for JavaScript execution)

### Installation and Running

**Linux/macOS**:
```bash
git clone https://github.com/yourusername/cursor2api-go.git
cd cursor2api-go
chmod +x start.sh
./start.sh
```

**Windows**:
```batch
# Double-click or run in cmd
start-go.bat

# Or in Git Bash / Windows Terminal
./start-go-utf8.bat
```

The service will start at `http://localhost:8002`

## 📡 API Usage

### List Models

```bash
curl -H "Authorization: Bearer 0000" http://localhost:8002/v1/models
```

### Non-Streaming Chat

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

### Streaming Chat

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

### Use in Third-Party Apps

In any app that supports custom OpenAI API (e.g., ChatGPT Next Web, Lobe Chat):

1. **API URL**: `http://localhost:8002`
2. **API Key**: `0000` (or custom)
3. **Model**: Choose from supported models

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8002` | Server port |
| `DEBUG` | `false` | Debug mode (shows detailed logs and route info when enabled) |
| `API_KEY` | `0000` | API authentication key |
| `MODELS` | See `.env.example` | Supported models (comma-separated) |
| `TIMEOUT` | `30` | Request timeout (seconds) |

### Debug Mode

By default, the service runs in clean mode. To enable detailed logging:

**Option 1**: Modify `.env` file
```bash
DEBUG=true
```

**Option 2**: Use environment variable
```bash
DEBUG=true ./cursor2api-go
```

Debug mode displays:
- Detailed GIN route information
- Verbose request logs
- x-is-human token details
- Browser fingerprint configuration

### Troubleshooting

Having issues? Check the **[Troubleshooting Guide](TROUBLESHOOTING.md)** for solutions to common problems, including:
- 403 Access Denied errors
- Token fetch failures
- Connection timeouts
- Cloudflare blocking


### Windows Startup Scripts

Two Windows startup scripts are provided:

- **`start-go.bat`** (Recommended): GBK encoding, perfect compatibility with Windows cmd.exe
- **`start-go-utf8.bat`**: UTF-8 encoding, for Git Bash, PowerShell, Windows Terminal

Both scripts have identical functionality, only display styles differ. Use `start-go.bat` if you encounter encoding issues.

## 🧪 Development

### Running Tests

```bash
# Run existing tests
go test ./...
```

### Building

```bash
# Build executable
go build -o cursor2api-go

# Cross-compile (e.g., for Linux)
GOOS=linux GOARCH=amd64 go build -o cursor2api-go-linux
```

## 📁 Project Structure

```
cursor2api-go/
├── main.go              # Main entry point
├── config/              # Configuration management
├── handlers/            # HTTP handlers
├── services/            # Business service layer
├── models/              # Data models
├── utils/               # Utility functions
├── middleware/          # Middleware
├── jscode/              # JavaScript code
├── static/              # Static files
├── start.sh             # Linux/macOS startup script
├── start-go.bat         # Windows startup script (GBK)
├── start-go-utf8.bat    # Windows startup script (UTF-8)
└── README.md            # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Follow [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- Format code with `gofmt`
- Check code with `go vet`
- Follow [Conventional Commits](https://conventionalcommits.org/) for commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This project is for learning and research purposes only. Do not use for commercial purposes. Please comply with the terms of service of related services when using this project.

---

⭐ If this project helps you, please give us a Star!
