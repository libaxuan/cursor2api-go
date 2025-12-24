#!/bin/bash

#  Cursor2API启动脚本

set -e

# 定义颜色代码
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# 打印标题
print_header() {
    echo ""
    echo -e "${CYAN}=========================================${NC}"
    echo -e "${WHITE}    🚀  Cursor2API启动器${NC}"
    echo -e "${CYAN}=========================================${NC}"
}

# 检查Go环境
check_go() {
    if ! command -v go &> /dev/null; then
        echo -e "${RED}❌ Go 未安装，请先安装 Go 1.21 或更高版本${NC}"
        echo -e "${YELLOW}💡 安装方法: https://golang.org/dl/${NC}"
        exit 1
    fi

    GO_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
    REQUIRED_VERSION="1.21"

    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$GO_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        echo -e "${RED}❌ Go 版本 $GO_VERSION 过低，请安装 Go $REQUIRED_VERSION 或更高版本${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ Go 版本检查通过: $GO_VERSION${NC}"
}

# 检查Node.js环境
check_nodejs() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装，请先安装 Node.js 18 或更高版本${NC}"
        echo -e "${YELLOW}💡 安装方法: https://nodejs.org/${NC}"
        exit 1
    fi

    NODE_VERSION=$(node --version | sed 's/v//')
    REQUIRED_VERSION="18.0.0"

    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        echo -e "${RED}❌ Node.js 版本 $NODE_VERSION 过低，请安装 Node.js $REQUIRED_VERSION 或更高版本${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ Node.js 版本检查通过: $NODE_VERSION${NC}"
}

# 处理环境配置
setup_env() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}📝 创建默认 .env 配置文件...${NC}"
        cat > .env << EOF
# 服务器配置
PORT=8002
DEBUG=true

# API配置
API_KEY=0000
MODELS=gpt-5,gpt-5-codex,gpt-5-mini,gpt-5-nano,gpt-4.1,gpt-4o,claude-3.5-sonnet,claude-3.5-haiku,claude-3.7-sonnet,claude-4-sonnet,claude-4.5-sonnet,claude-4-opus,claude-4.1-opus,gemini-2.5-pro,gemini-2.5-flash,o3,o4-mini,deepseek-r1,deepseek-v3.1,kimi-k2-instruct,grok-3,grok-3-mini,grok-4,code-supernova-1-million
SYSTEM_PROMPT_INJECT=

# 请求配置
TIMEOUT=30
USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36

# Cursor配置
SCRIPT_URL=https://cursor.com/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/a-4-a/c.js?i=0&v=3&h=cursor.com
EOF
        echo -e "${GREEN}✅ 默认 .env 文件已创建${NC}"
    else
        echo -e "${GREEN}✅ 配置文件 .env 已存在${NC}"
    fi
}

# 构建应用
build_app() {
    echo -e "${BLUE}📦 正在下载 Go 依赖...${NC}"
    go mod download

    echo -e "${BLUE}🔨 正在编译 Go 应用...${NC}"
    go build -o cursor2api-go .

    if [ ! -f cursor2api-go ]; then
        echo -e "${RED}❌ 编译失败！${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ 应用编译成功！${NC}"
}

# 显示服务信息
show_info() {
    # 获取配置信息
    PORT=$(grep -E '^PORT=' .env 2>/dev/null | cut -d'=' -f2 | tr -d ' ' || echo "8002")
    API_KEY=$(grep -E '^API_KEY=' .env 2>/dev/null | cut -d'=' -f2 | tr -d ' ' || echo "0000")

    echo ""
    echo -e "${PURPLE}🚀 服务启动信息:${NC}"
    echo -e "  ${WHITE}服务器地址:${NC} ${CYAN}http://127.0.0.1:${PORT}${NC}"
    echo -e "  ${WHITE}在线文档:${NC} ${CYAN}http://127.0.0.1:${PORT}${NC}"
    echo -e "  ${WHITE}API密钥:${NC} ${YELLOW}${API_KEY}${NC}"
    echo ""

    echo -e "${PURPLE}📡 支持的接口:${NC}"
    echo -e "  ${GREEN}GET${NC}    ${WHITE}/${NC} - API文档页面"
    echo -e "  ${GREEN}GET${NC}    ${WHITE}/v1/models${NC} - 获取模型列表"
    echo -e "  ${BLUE}POST${NC}   ${WHITE}/v1/chat/completions${NC} - 聊天完成"
    echo -e "  ${GREEN}GET${NC}    ${WHITE}/health${NC} - 健康检查"
    echo ""

    echo -e "${PURPLE}🤖 支持的模型 (24个):${NC}"
    echo "  - gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano"
    echo "  - gpt-4.1, gpt-4o, o3, o4-mini"
    echo "  - claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet"
    echo "  - claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus"
    echo "  - gemini-2.5-pro, gemini-2.5-flash"
    echo "  - deepseek-r1, deepseek-v3.1, kimi-k2-instruct"
    echo "  - grok-3, grok-3-mini, grok-4, code-supernova-1-million"

    echo ""
    echo -e "${GREEN}🟢 正在启动服务器...${NC}"
    echo -e "${CYAN}=========================================${NC}"
    echo ""
}

# 启动服务器
start_server() {
    # 捕获中断信号
    trap 'echo -e "\n${YELLOW}⏹️  正在停止服务器...${NC}"; exit 0' INT

    ./cursor2api-go
}

# 主函数
main() {
    print_header
    check_go
    check_nodejs
    setup_env
    build_app
    show_info
    start_server
}

# 运行主函数
main