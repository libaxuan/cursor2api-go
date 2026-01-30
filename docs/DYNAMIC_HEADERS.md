# 动态 Header 改进说明

## 问题背景

之前的实现中，HTTP headers 是硬编码的：
- `sec-ch-ua-platform` 固定为 `"macOS"` 或 `"Windows"`
- `sec-ch-ua` 固定为特定的 Chrome 版本
- `Referer` 和 `accept-language` 固定不变

这种硬编码的方式容易被 Cursor API 识别为异常请求，导致 403 错误。

## 改进方案

### 1. 动态浏览器指纹生成器 (`utils/headers.go`)

创建了 `HeaderGenerator` 类，实现以下功能：

#### 智能平台选择
- 根据当前操作系统自动选择合适的浏览器配置
- macOS: 支持 Intel (x86) 和 Apple Silicon (arm) 架构
- Windows: 支持多个版本 (10.0, 11.0, 15.0)
- Linux: 标准 x86_64 配置

#### 随机化配置
- **Chrome 版本**: 从 120-130 随机选择
- **语言设置**: 支持 en-US, zh-CN, en-GB, ja-JP
- **Referer**: 随机选择不同的 Cursor 页面
- **User-Agent**: 根据平台和版本动态生成

#### 真实的浏览器指纹
生成的 headers 包含完整的浏览器指纹信息：
```json
{
  "sec-ch-ua-platform": "macOS",
  "sec-ch-ua-platform-version": "14.0.0",
  "sec-ch-ua-arch": "arm",
  "sec-ch-ua-bitness": "64",
  "sec-ch-ua": "\"Google Chrome\";v=\"126\", \"Chromium\";v=\"126\", \"Not(A:Brand\";v=\"24\"",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36..."
}
```

### 2. 自动刷新机制

当遇到 403 错误时：
1. 自动刷新浏览器指纹配置
2. 清除 x-is-human token 缓存
3. 使用新的配置重试请求

### 3. 代码改进

#### 服务初始化
```go
type CursorService struct {
    // ... 其他字段
    headerGenerator *utils.HeaderGenerator
}

func NewCursorService(cfg *config.Config) *CursorService {
    return &CursorService{
        // ... 其他初始化
        headerGenerator: utils.NewHeaderGenerator(),
    }
}
```

#### Headers 生成
```go
// 之前：硬编码
func (s *CursorService) chatHeaders(xIsHuman string) map[string]string {
    return map[string]string{
        "sec-ch-ua-platform": `"macOS"`,  // 固定值
        "sec-ch-ua": `"Google Chrome";v="143"...`,  // 固定版本
        // ...
    }
}

// 现在：动态生成
func (s *CursorService) chatHeaders(xIsHuman string) map[string]string {
    return s.headerGenerator.GetChatHeaders(xIsHuman)
}
```

#### 403 错误处理
```go
if resp.StatusCode == http.StatusForbidden && attempt < maxRetries {
    logrus.Warn("Received 403, refreshing browser fingerprint...")
    
    // 刷新浏览器指纹
    s.headerGenerator.Refresh()
    
    // 清除 token 缓存
    s.scriptMutex.Lock()
    s.scriptCache = ""
    s.scriptCacheTime = time.Time{}
    s.scriptMutex.Unlock()
    
    // 重试
    continue
}
```

## 优势

### 1. 更难被检测
- 每次请求的指纹信息都可能不同
- 模拟真实用户的多样性
- 避免固定模式被识别

### 2. 自动适应
- 根据运行环境自动选择合适的配置
- macOS 上运行自动使用 macOS 配置
- Windows 上运行自动使用 Windows 配置

### 3. 更好的容错性
- 遇到 403 错误自动切换配置
- 增加请求成功率
- 减少人工干预

### 4. 易于维护
- 集中管理浏览器配置
- 易于添加新的平台或版本
- 代码更简洁清晰

## 测试结果

运行测试程序可以看到：
```
浏览器配置:
  平台: macOS
  平台版本: 14.0.0
  架构: arm
  位数: 64
  Chrome 版本: 126
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...

生成 5 个随机配置:
1. macOS | Chrome 130 | arm
2. macOS | Chrome 125 | arm
3. macOS | Chrome 130 | x86
4. macOS | Chrome 128 | arm
5. macOS | Chrome 122 | arm
```

每次生成的配置都不同，增加了多样性。

## 使用方法

无需任何配置，直接使用即可：

```bash
# 重新编译
go build -o cursor2api-go

# 运行服务
./cursor2api-go
```

服务会自动：
- 根据操作系统选择合适的浏览器配置
- 为每个请求生成动态 headers
- 遇到 403 错误时自动刷新配置并重试

## 日志示例

启用调试模式后可以看到：
```
DEBU Sending request to Cursor API attempt=1 model=claude-4.5-sonnet
WARN Received 403 Access Denied, refreshing browser fingerprint...
DEBU Refreshed browser fingerprint platform=macOS chrome_version=124
DEBU Sending request to Cursor API attempt=2 model=claude-4.5-sonnet
```

## 未来改进

可以考虑的进一步优化：
1. 添加更多浏览器类型 (Firefox, Safari)
2. 支持移动设备指纹
3. 根据成功率动态调整配置策略
4. 添加指纹轮换策略 (定期刷新)
