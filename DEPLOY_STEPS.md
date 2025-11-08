# 完成部署步骤

你的 Worker 已经成功上传到 Cloudflare，但需要注册 workers.dev 子域名才能访问。

## 方法 1：注册 workers.dev 子域名（推荐）

### 步骤：

1. **打开 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com
   - 使用你的账户登录（zichengtang349@gmail.com）

2. **进入 Workers & Pages**
   - 在左侧菜单中点击 "Workers & Pages"

3. **注册子域名**
   - 如果系统提示注册 workers.dev 子域名
   - 选择一个唯一的子域名（例如：`tangzc`、`myapp`、`deepseek-api` 等）
   - 点击"注册"或"Set up"

4. **重新部署**
   ```bash
   source ~/.nvm/nvm.sh && nvm use 20
   npm run deploy
   ```

5. **访问你的 Worker**
   部署成功后会显示 URL：
   ```
   https://koa-graphql-deepseek.<你的子域名>.workers.dev
   ```

## 方法 2：如果无法注册 workers.dev（备选方案）

如果你有自己的域名托管在 Cloudflare，可以直接使用自定义域名：

### 编辑 wrangler.toml：

```toml
name = "koa-graphql-deepseek"
main = "src/index.js"
compatibility_date = "2024-01-01"

# 使用自定义域名（替换为你的域名）
# routes = [
#   { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
# ]

[vars]
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"
PORT = "4000"
NODE_ENV = "production"
```

取消注释 routes 部分并替换为你的域名，然后重新部署。

## 方法 3：在 Dashboard 中手动设置（简单）

1. 访问 https://dash.cloudflare.com
2. 点击 "Workers & Pages"
3. 找到 "koa-graphql-deepseek" Worker
4. 点击 "Settings" -> "Triggers"
5. 在 "Routes" 部分添加触发器

## 测试部署

部署成功后，测试 API：

```bash
# 健康检查
curl https://koa-graphql-deepseek.<你的子域名>.workers.dev/health

# GraphQL 查询
curl -X POST https://koa-graphql-deepseek.<你的子域名>.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ deepseekStatus { status timestamp } }"}'

# Chat 测试
curl -X POST https://koa-graphql-deepseek.<你的子域名>.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ chat(message: \"Hello\") { content model } }"}'
```

## 当前状态

✅ Worker 代码已上传
✅ 环境变量已设置（DEEPSEEK_API_KEY）
✅ 已登录 Cloudflare
⏳ 等待注册 workers.dev 子域名

## 需要帮助？

如果遇到问题：
1. 检查 Cloudflare Dashboard：https://dash.cloudflare.com
2. 查看 Worker 日志：`npm run tail`
3. 查看部署历史：`npx wrangler deployments list`
