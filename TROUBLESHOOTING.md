# 故障排除指南

## 403 Access Denied 错误

### 问题描述
在使用一段时间后,服务突然开始返回 `403 Access Denied` 错误:
```
ERRO[0131] Cursor API returned non-OK status             status_code=403
ERRO[0131] Failed to create chat completion              error="{\"error\":\"Access denied\"}"
```

### 原因分析
1. **Token 过期**: `x-is-human` token 缓存时间过长,导致 token 失效
2. **频率限制**: 短时间内发送过多请求触发了 Cursor API 的速率限制
3. **重复 Token**: 使用相同的 token 进行多次请求被识别为异常行为

### 解决方案

#### 1. 已实施的自动修复
最新版本已经包含以下改进:

- **动态浏览器指纹**: 每次请求使用真实且随机的浏览器指纹信息
  - 根据操作系统自动选择合适的平台配置 (Windows/macOS/Linux)
  - 随机 Chrome 版本 (120-130)
  - 随机语言设置和 Referer
  - 真实的 User-Agent 和 sec-ch-ua headers
- **缩短缓存时间**: 将 `x-is-human` token 缓存时间从 30 分钟缩短到 1 分钟
- **自动重试机制**: 遇到 403 错误时自动清除缓存并重试(最多 2 次)
- **指纹刷新**: 403 错误时自动刷新浏览器指纹配置
- **错误恢复**: 失败时自动清除缓存,确保下次请求使用新 token
- **指数退避**: 重试时使用递增的等待时间

#### 2. 手动解决步骤
如果问题持续存在:

1. **重启服务**:
   ```bash
   # 停止当前服务 (Ctrl+C)
   # 重新启动
   ./cursor2api-go
   ```

2. **检查日志**:
   查看是否有以下日志:
   - `Received 403 Access Denied, clearing token cache and retrying...` - 自动重试
   - `Failed to fetch x-is-human token` - Token 获取失败
   - `Fetched x-is-human token` - Token 获取成功

3. **等待冷却期**:
   如果频繁遇到 403 错误,建议等待 5-10 分钟后再使用

4. **检查网络**:
   确保能够访问 `https://cursor.com`

#### 3. 预防措施

1. **控制请求频率**: 避免在短时间内发送大量请求
2. **监控日志**: 注意 `x-is-human token` 的获取频率
3. **合理配置超时**: 在 `config.yaml` 中设置合理的超时时间

### 配置建议

在 `config.yaml` 中:
```yaml
timeout: 120  # 增加超时时间,避免频繁重试
max_input_length: 100000  # 限制输入长度,减少请求大小
```

### 调试模式

如果需要查看详细的调试信息,可以设置日志级别:
```bash
export LOG_LEVEL=debug
./cursor2api-go
```

这将显示:
- 每次请求的 `x-is-human` token (前 50 字符)
- 请求的 payload 大小
- 重试次数
- 详细的错误信息

## 其他常见问题

### Cloudflare 403 错误
如果看到 `Cloudflare 403` 错误,说明请求被 Cloudflare 防火墙拦截。这通常是因为:
- IP 被标记为可疑
- User-Agent 不匹配
- 缺少必要的浏览器指纹

**解决方案**: 检查 `config.yaml` 中的 `fingerprint` 配置是否正确。

### 连接超时
如果频繁出现连接超时:
1. 检查网络连接
2. 增加 `timeout` 配置值
3. 检查防火墙设置

### Token 获取失败 (404 Not Found)
如果日志显示 `failed to fetch script: script fetch returned status 404`:
1. **检查 SCRIPT_URL**: 确保 `.env` 中的 `SCRIPT_URL` 包含完整的 UUID 路径（不仅仅是 `_app.js`）。你可以通过浏览器抓包 Cursor 官网的 `c.js` 请求来获取最新地址。
2. **源码完整性**: 确保 `jscode/` 目录中包含 `main.js` 和 `env.js`。
3. **Docker 映射**: 如果使用 Docker，请确保 `Dockerfile` 中有 `COPY jscode ./jscode` 指令。

### UI 仪表盘不更新
如果你修改了 `static/index.html` 但访问根路径时没有变化：
**原因**: Go 后端在启动时会**预加载** `static/docs.html` 到内存中。
**解决方案**: 
1. 确保修改的是 `static/docs.html` 而不仅仅是 `index.html`。
2. 必须**重启服务**以清除预加载缓存。
3. 检查控制台日志是否提示 `预加载文档成功`。

### JavaScript 执行错误 (Node.js)
如果报错 `failed to execute JS`:
1. **安装 Node.js**: 该项目需要 `node` 命令来计算人机挑战 Token。
2. **Docker 环境**: 确保基础镜像（如 Alpine）中安装了 `nodejs`。

## 联系支持

如果问题仍未解决,请提供以下信息:
1. 完整的错误日志
2. `config.yaml` 配置(隐藏敏感信息)
3. 使用的 Go 版本
4. 操作系统信息
