# Cursor2API

English | [简体中文](README.md)

A Go service that converts Cursor Web to a basic OpenAI chat completions compatible API, suitable for local deployment.

[![Go Version](https://img.shields.io/badge/Go-1.24+-blue.svg)](https://golang.org)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-orange.svg)](https://polyformproject.org/licenses/noncommercial/1.0.0/)

## ✨ Features

- ✅ Compatible with the basic OpenAI chat completions format
- ✅ Supports streaming and non-streaming responses
- ✅ High-performance Go implementation
- ✅ Automatic Cursor Web authentication
- ✅ Clean web interface
- ❌ Does not support tools / function calling / MCP

## 🤖 Supported Models

- **Anthropic Claude**: claude-sonnet-4.6

## 🚀 Quick Start

### Requirements

- Go 1.24+
- Node.js 18+ (for JavaScript execution)

### Local Running Methods

#### Method 1: Direct Run (Recommended for development)

**Linux/macOS**:
```bash
git clone https://github.com/libaxuan/cursor2api-go.git
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

#### Method 2: Manual Compile and Run

```bash
# Clone the project
git clone https://github.com/libaxuan/cursor2api-go.git
cd cursor2api-go

# Download dependencies
go mod tidy

# Build
go build -o cursor2api-go

# Run
./cursor2api-go
```

#### Method 3: Using go run

```bash
git clone https://github.com/libaxuan/cursor2api-go.git
cd cursor2api-go
go run main.go
```

The service will start at `http://localhost:8002`

## 🚀 Server Deployment Methods

### Docker Deployment

1. **Build Image**:
```bash
# Build image
docker build -t cursor2api-go .
```

2. **Run Container**:
```bash
# Run container (recommended)
docker run -d \
  --name cursor2api-go \
  --restart unless-stopped \
  -p 8002:8002 \
  -e API_KEY=your-secret-key \
  -e DEBUG=false \
  cursor2api-go

# Or run with default configuration
docker run -d --name cursor2api-go --restart unless-stopped -p 8002:8002 cursor2api-go
```

### Docker Compose Deployment (Recommended for production)

1. **Using docker-compose.yml**:
```bash
# Start service
docker-compose up -d

# Stop service
docker-compose down

# View logs
docker-compose logs -f
```

2. **Custom Configuration**:
Modify the environment variables in the `docker-compose.yml` file to meet your needs:
- Change `API_KEY` to a secure key
- Adjust `MODELS`, `TIMEOUT`, and other configurations as needed
- Change the exposed port

### System Service Deployment (Linux)

1. **Compile and Move Binary**:
```bash
go build -o cursor2api-go
sudo mv cursor2api-go /usr/local/bin/
sudo chmod +x /usr/local/bin/cursor2api-go
```

2. **Create System Service File** `/etc/systemd/system/cursor2api-go.service`:
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

3. **Start Service**:
```bash
# Reload systemd configuration
sudo systemctl daemon-reload

# Enable auto-start on boot
sudo systemctl enable cursor2api-go

# Start service
sudo systemctl start cursor2api-go

# Check status
sudo systemctl status cursor2api-go
```

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
    "model": "claude-sonnet-4.6",
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
    "model": "claude-sonnet-4.6",
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
| `MODELS` | `claude-sonnet-4.6` | Supported models (comma-separated) |
| `TIMEOUT` | `60` | Request timeout (seconds) |

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
├── main.go              # Main entry point (Go version)
├── config/              # Configuration management (Go version)
├── handlers/            # HTTP handlers (Go version)
├── services/            # Business service layer (Go version)
├── models/              # Data models (Go version)
├── utils/               # Utility functions (Go version)
├── middleware/          # Middleware (Go version)
├── jscode/              # JavaScript code (Go version)
├── static/              # Static files (Go version)
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

This project is licensed under [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/).
Commercial use is not permitted. See the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

Please comply with the terms of service of related services when using this project.

---

⭐ If this project helps you, please give us a Star!
