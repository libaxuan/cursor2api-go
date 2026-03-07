# API Capabilities

## Supported

- OpenAI-compatible `POST /v1/chat/completions`
- Non-stream responses with plain text assistant output
- Stream responses with plain text chunks
- Multi-turn context via the `messages` array
- `GET /v1/models`
- Bearer token auth via `Authorization: Bearer <API_KEY>`

## Not Supported

- OpenAI/KiloCode native tool calling
- MCP tool orchestration
- `tool_calls`, `tools`, `tool_choice`
- Function calling / agent loops
- Direct local filesystem execution through the API

## Recommended Usage

Use this service as a plain chat-completions gateway.

Example non-stream request:

```bash
curl -X POST http://127.0.0.1:8002/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0000" \
  -d '{
    "model": "claude-sonnet-4.6",
    "stream": false,
    "messages": [
      {"role": "system", "content": "You are a concise assistant."},
      {"role": "user", "content": "记住我最喜欢的颜色是蓝色。"},
      {"role": "assistant", "content": "好的，我记住了。"},
      {"role": "user", "content": "我最喜欢什么颜色？"}
    ]
  }'
```

## Notes

- Context continuity depends on the caller sending prior messages back in `messages`.
- If you need tool use, use a provider that natively supports OpenAI-compatible tool calling.
