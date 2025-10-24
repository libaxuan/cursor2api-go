# --- Build Stage ---
FROM golang:1.24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install necessary packages
RUN apk add --no-cache git ca-certificates

# Copy the Go module files
COPY go.mod go.sum ./

# Download Go module dependencies
RUN go mod download

# Copy the entire source code into the container
COPY . .

# Build the application, creating a statically linked binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o cursor2api-go .


# --- Final/Runtime Stage ---
FROM alpine:latest

# MODIFIED: Install ca-certificates AND nodejs + npm
RUN apk --no-cache add ca-certificates nodejs npm

# Create a non-root user for security best practices
RUN adduser -D -g '' appuser

# Set the working directory for the final image
WORKDIR /root/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/cursor2api-go .

# Copy the static files (for the web documentation) from the builder stage
COPY --from=builder /app/static ./static

# Copy the jscode directory from the builder stage
COPY --from=builder /app/jscode ./jscode

# Change the ownership of all files to the non-root user
RUN chown -R appuser:appuser /root/

# Switch to the non-root user
USER appuser

# Expose the port that the application will listen on
EXPOSE 8002

# Healthcheck lets Docker know if the application is running correctly
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8002/health || exit 1

# Command to run the application when the container starts
CMD ["./cursor2api-go"]
