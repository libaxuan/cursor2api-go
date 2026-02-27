# 构建阶段
FROM golang:1.24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装必要的包
RUN apk add --no-cache git ca-certificates

# 复制go mod文件
COPY go.mod go.sum ./

# 下载依赖
RUN go mod download

# 复制源码
COPY . .

# 构建应用
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o cursor2api-go .

# 运行阶段
FROM alpine:latest

# 安装 ca-certificates 和 nodejs（用于 JavaScript 执行）
RUN apk --no-cache add ca-certificates nodejs npm

# 创建非 root 用户
RUN adduser -D -g '' appuser

WORKDIR /root/

# 从构建阶段复制二进制文件
COPY --from=builder /app/cursor2api-go .

# 复制静态文件和 JS 代码（需要用于 JavaScript 执行）
COPY --from=builder /app/static ./static
COPY --from=builder /app/jscode ./jscode

# 更改所有者
RUN chown -R appuser:appuser /root/

# 切换到非root用户
USER appuser

# 暴露端口
EXPOSE 8002

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8002/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

# 启动应用
CMD ["./cursor2api-go"]