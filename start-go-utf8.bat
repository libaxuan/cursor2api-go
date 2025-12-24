@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

::  Cursor2API启动脚本

echo.
echo =========================================
echo     🚀  Cursor2API启动器
echo =========================================
echo.

:: 检查Go是否安装
go version >nul 2>&1
if errorlevel 1 (
    echo ❌ Go 未安装，请先安装 Go 1.21 或更高版本
    echo 💡 安装方法: https://golang.org/dl/
    pause
    exit /b 1
)

:: 显示Go版本并检查版本号
for /f "tokens=3" %%i in ('go version') do set GO_VERSION=%%i
set GO_VERSION=!GO_VERSION:go=!
echo ✅ Go 版本检查通过: !GO_VERSION!

:: 检查Node.js是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18 或更高版本
    echo 💡 安装方法: https://nodejs.org/
    pause
    exit /b 1
)

:: 显示Node.js版本
for /f "delims=" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js 版本检查通过: !NODE_VERSION!

:: 创建.env文件（如果不存在）
if not exist .env (
    echo 📝 创建默认 .env 配置文件...
    (
        echo # 服务器配置
        echo PORT=8002
        echo DEBUG=true
        echo.
        echo # API配置
        echo API_KEY=0000
        echo MODELS=gpt-5.1,gpt-5,gpt-5-codex,gpt-5-mini,gpt-5-nano,gpt-4.1,gpt-4o,claude-3.5-sonnet,claude-3.5-haiku,claude-3.7-sonnet,claude-4-sonnet,claude-4.5-sonnet,claude-4-opus,claude-4.1-opus,gemini-2.5-pro,gemini-2.5-flash,gemini-3.0-pro,o3,o4-mini,deepseek-r1,deepseek-v3.1,kimi-k2-instruct,grok-3
        echo SYSTEM_PROMPT_INJECT=
        echo.
        echo # 请求配置
        echo TIMEOUT=30
        echo USER_AGENT=Mozilla/5.0 ^(Windows NT 10.0; Win64; x64^) AppleWebKit/537.36 ^(KHTML, like Gecko^) Chrome/140.0.0.0 Safari/537.36
        echo.
        echo # Cursor配置
        echo SCRIPT_URL=https://cursor.com/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/a-4-a/c.js?i=0^^^&v=3^^^&h=cursor.com
    ) > .env
    echo ✅ 默认 .env 文件已创建
) else (
    echo ✅ 配置文件 .env 已存在
)

:: 下载依赖
echo.
echo 📦 正在下载 Go 依赖...
go mod download
if errorlevel 1 (
    echo ❌ 依赖下载失败！
    pause
    exit /b 1
)

:: 构建应用
echo 🔨 正在编译 Go 应用...
go build -o cursor2api-go.exe .
if errorlevel 1 (
    echo ❌ 编译失败！
    pause
    exit /b 1
)

:: 检查构建是否成功
if not exist cursor2api-go.exe (
    echo ❌ 编译失败 - 可执行文件未找到！
    pause
    exit /b 1
)

echo ✅ 应用编译成功！

:: 获取端口配置
set PORT=8002
for /f "tokens=2 delims==" %%i in ('findstr /r "^PORT" .env 2^>nul') do set PORT=%%i
set PORT=!PORT: =!

:: 获取API密钥
set API_KEY=0000
for /f "tokens=2 delims==" %%i in ('findstr /r "^API_KEY" .env 2^>nul') do set API_KEY=%%i
set API_KEY=!API_KEY: =!

:: 显示服务信息
echo.
echo 🚀 服务启动信息:
echo   服务器地址: http://127.0.0.1:!PORT!
echo   在线文档: http://127.0.0.1:!PORT!
echo   API密钥: !API_KEY!
echo.

echo 📡 支持的接口:
echo   GET    / - API文档页面
echo   GET    /v1/models - 获取模型列表
echo   POST   /v1/chat/completions - 聊天完成
echo   GET    /health - 健康检查
echo.

echo 🤖 支持的模型 ^(23个^):
echo   - gpt-5.1, gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano
echo   - gpt-4.1, gpt-4o, o3, o4-mini
echo   - claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet
echo   - claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus
echo   - gemini-2.5-pro, gemini-2.5-flash, gemini-3.0-pro
echo   - deepseek-r1, deepseek-v3.1, kimi-k2-instruct
echo   - grok-3
echo.

echo 🟢 正在启动服务器...
echo =========================================
echo 按 Ctrl+C 停止服务器
echo.

:: 启动服务
cursor2api-go.exe

pause