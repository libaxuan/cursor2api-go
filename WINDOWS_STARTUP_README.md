# Windows 启动脚本说明

本项目提供了两个Windows启动脚本版本,请根据您的使用环境选择:

## 📋 脚本版本对比

### 1. **start-go.bat** (推荐)
- **编码**: GBK/ANSI
- **兼容性**: ✅ 完美兼容Windows cmd.exe
- **使用方式**: 直接双击运行
- **显示效果**: 使用文本标记 [成功]、[错误]、[信息] 等
- **适用场景**: Windows原生命令提示符(cmd.exe)

### 2. **start-go-utf8.bat**
- **编码**: UTF-8
- **兼容性**: ✅ Git Bash、PowerShell、Windows Terminal
- **使用方式**: 在支持UTF-8的终端中运行
- **显示效果**: 使用emoji表情符号 🚀❌✅💡 等
- **适用场景**: 现代终端环境,与项目其他文件编码保持一致

## 🚀 使用方法

### 方式一: Windows cmd.exe (推荐)
```batch
# 直接双击运行
start-go.bat

# 或在cmd中运行
.\start-go.bat
```

### 方式二: Git Bash / Windows Terminal
```bash
# 使用UTF-8版本获得更好的视觉效果
./start-go-utf8.bat

# 或使用bash语法
bash start.sh
```

## 📊 功能对齐

两个批处理脚本都已完全对齐Mac版本的 [`start.sh`](start.sh:1) 功能:

✅ Go环境检查 (需要 Go 1.21+)  
✅ Node.js环境检查 (需要 Node.js 18+)  
✅ 自动创建.env配置文件  
✅ 自动下载Go依赖  
✅ 自动编译应用  
✅ 显示服务信息和支持的模型列表  
✅ 启动服务器  

## 🔧 关键改进

1. **版本检查**: 添加了Go和Node.js版本显示
2. **配置优化**: 改进了.env文件的读取和空格处理
3. **错误处理**: 添加了更完善的错误处理和提示
4. **URL转义**: 修复了SCRIPT_URL参数的转义问题 (`&` → `^^^&`)
5. **编码支持**: 脚本开头自动执行 `chcp 65001` 切换到UTF-8编码

## 📝 注意事项

- 两个脚本功能完全相同,仅显示样式不同
- 如果遇到乱码,请使用 [`start-go.bat`](start-go.bat:1) (GBK版本)
- 如果您使用现代终端,推荐使用 [`start-go-utf8.bat`](start-go-utf8.bat:1) 获得更好的视觉效果
- Mac/Linux用户请使用 [`start.sh`](start.sh:1)

## 🌟 编码标准

- **项目标准**: UTF-8 (所有源代码文件)
- **Windows兼容**: GBK/ANSI (start-go.bat)
- **最佳实践**: 提供两个版本兼顾兼容性和一致性