@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

:: Cursor2API Go�汾�����ű�

echo.
echo =========================================
echo     Cursor2API Go�汾������
echo =========================================
echo.

:: ���Go�Ƿ�װ
go version >nul 2>&1
if errorlevel 1 (
    echo [����] Go δ��װ�����Ȱ�װ Go 1.21 ����߰汾
    echo [��ʾ] ��װ����: https://golang.org/dl/
    pause
    exit /b 1
)

:: ��ʾGo�汾�����汾��
for /f "tokens=3" %%i in ('go version') do set GO_VERSION=%%i
set GO_VERSION=!GO_VERSION:go=!
echo [�ɹ�] Go �汾���ͨ��: !GO_VERSION!

:: ���Node.js�Ƿ�װ
node --version >nul 2>&1
if errorlevel 1 (
    echo [����] Node.js δ��װ�����Ȱ�װ Node.js 18 ����߰汾
    echo [��ʾ] ��װ����: https://nodejs.org/
    pause
    exit /b 1
)

:: ��ʾNode.js�汾
for /f "delims=" %%i in ('node --version') do set NODE_VERSION=%%i
echo [�ɹ�] Node.js �汾���ͨ��: !NODE_VERSION!

:: ����.env�ļ�����������ڣ�
if not exist .env (
    echo [��Ϣ] ����Ĭ�� .env �����ļ�...
    (
        echo # ����������
        echo PORT=8002
        echo DEBUG=true
        echo.
        echo # API����
        echo API_KEY=0000
        echo MODELS=gpt-5,gpt-5-codex,gpt-5-mini,gpt-5-nano,gpt-4.1,gpt-4o,claude-3.5-sonnet,claude-3.5-haiku,claude-3.7-sonnet,claude-4-sonnet,claude-4.5-sonnet,claude-4-opus,claude-4.1-opus,gemini-2.5-pro,gemini-2.5-flash,o3,o4-mini,deepseek-r1,deepseek-v3.1,kimi-k2-instruct,grok-3,grok-3-mini,grok-4,code-supernova-1-million
        echo SYSTEM_PROMPT_INJECT=
        echo.
        echo # ��������
        echo TIMEOUT=30
        echo USER_AGENT=Mozilla/5.0 ^(Windows NT 10.0; Win64; x64^) AppleWebKit/537.36 ^(KHTML, like Gecko^) Chrome/140.0.0.0 Safari/537.36
        echo.
        echo # Cursor����
        echo SCRIPT_URL=https://cursor.com/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/a-4-a/c.js?i=0^^^&v=3^^^&h=cursor.com
    ) > .env
    echo [�ɹ�] Ĭ�� .env �ļ��Ѵ���
) else (
    echo [�ɹ�] �����ļ� .env �Ѵ���
)

:: ��������
echo.
echo [��Ϣ] �������� Go ����...
go mod download
if errorlevel 1 (
    echo [����] ��������ʧ�ܣ�
    pause
    exit /b 1
)

:: ����Ӧ��
echo [��Ϣ] ���ڱ��� Go Ӧ��...
go build -o cursor2api-go.exe .
if errorlevel 1 (
    echo [����] ����ʧ�ܣ�
    pause
    exit /b 1
)

:: ��鹹���Ƿ�ɹ�
if not exist cursor2api-go.exe (
    echo [����] ����ʧ�� - ��ִ���ļ�δ�ҵ���
    pause
    exit /b 1
)

echo [�ɹ�] Ӧ�ñ���ɹ���

:: ��ȡ�˿�����
set PORT=8002
for /f "tokens=2 delims==" %%i in ('findstr /r "^PORT" .env 2^>nul') do set PORT=%%i
set PORT=!PORT: =!

:: ��ȡAPI��Կ
set API_KEY=0000
for /f "tokens=2 delims==" %%i in ('findstr /r "^API_KEY" .env 2^>nul') do set API_KEY=%%i
set API_KEY=!API_KEY: =!

:: ��ʾ������Ϣ
echo.
echo [����] ����������Ϣ:
echo   ��������ַ: http://127.0.0.1:!PORT!
echo   �����ĵ�: http://127.0.0.1:!PORT!
echo   API��Կ: !API_KEY!
echo.

echo [�ӿ�] ֧�ֵĽӿ�:
echo   GET    / - API�ĵ�ҳ��
echo   GET    /v1/models - ��ȡģ���б�
echo   POST   /v1/chat/completions - �������
echo   GET    /health - �������
echo.

echo [ģ��] ֧�ֵ�ģ�� ^(24��^):
echo   - gpt-5, gpt-5-codex, gpt-5-mini, gpt-5-nano
echo   - gpt-4.1, gpt-4o, o3, o4-mini
echo   - claude-3.5-sonnet, claude-3.5-haiku, claude-3.7-sonnet
echo   - claude-4-sonnet, claude-4.5-sonnet, claude-4-opus, claude-4.1-opus
echo   - gemini-2.5-pro, gemini-2.5-flash
echo   - deepseek-r1, deepseek-v3.1, kimi-k2-instruct
echo   - grok-3, grok-3-mini, grok-4, code-supernova-1-million
echo.

echo [����] ��������������...
echo =========================================
echo �� Ctrl+C ֹͣ������
echo.

:: ��������
cursor2api-go.exe

pause