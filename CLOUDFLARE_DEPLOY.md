# Cloudflare Workers 部署指南

本项目已配置好 Cloudflare Workers 部署。按照以下步骤进行部署：

## 前置要求

1. **Node.js v20.0.0 或更高版本**
   ```bash
   # 检查当前版本
   node --version

   # 如果版本低于 v20，使用 nvm 升级：
   # 安装 nvm (如果还没有)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # 安装并使用 Node.js v20
   nvm install 20
   nvm use 20
   ```

2. **Cloudflare 账户**
   - 访问 https://dash.cloudflare.com/sign-up 注册账户（免费）
   - Workers 免费套餐包含 100,000 次请求/天

## 部署步骤

### 1. 登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器，让你授权 Wrangler 访问你的 Cloudflare 账户。

### 2. 配置环境变量（生产环境）

设置 DeepSeek API Key（这是敏感信息，不会被提交到代码库）：

```bash
npx wrangler secret put DEEPSEEK_API_KEY
```

系统会提示你输入 API Key 值：`sk-0107fcc31ba44fb0b6d1c7039385d05a`

### 3. 部署到 Cloudflare Workers

```bash
npm run worker:deploy
```

或

```bash
npx wrangler deploy
```

部署成功后，会显示你的 Worker URL，例如：
```
https://koa-graphql-deepseek.<your-subdomain>.workers.dev
```

### 4. 测试部署

```bash
# 测试健康检查
curl https://koa-graphql-deepseek.<your-subdomain>.workers.dev/health

# 测试 GraphQL
curl -X POST https://koa-graphql-deepseek.<your-subdomain>.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ deepseekStatus { status timestamp } }"}'
```

## 本地开发 Workers 应用

如果你想在本地测试 Workers 应用：

```bash
# 确保 Node.js >= v20
node --version

# 启动本地开发服务器
npm run worker:dev
```

本地服务器会运行在 `http://localhost:8787`

## 查看实时日志

部署后，查看 Worker 的实时日志：

```bash
npm run worker:tail
```

或

```bash
npx wrangler tail
```

## 可用脚本

- `npm run worker:dev` - 本地运行 Workers 应用（需要 Node.js v20+）
- `npm run worker:deploy` - 部署到 Cloudflare Workers
- `npm run worker:tail` - 查看生产环境日志
- `npm run dev` - 运行原始 Koa 应用（Node.js 本地版本）
- `npm start` - 启动 Koa 生产服务器

## 文件说明

- `src/worker.js` - Workers 主入口文件（使用 Hono 框架）
- `src/services/deepseek.worker.js` - Workers 版本的 DeepSeek 服务
- `src/graphql/resolvers.worker.js` - Workers 版本的 GraphQL resolvers
- `wrangler.toml` - Cloudflare Workers 配置文件
- `.dev.vars` - 本地开发环境变量（不提交到 Git）
- `.env` - Koa 应用环境变量（不提交到 Git）

## 架构说明

本项目包含两个版本：

1. **Koa 版本** (`src/index.js`)
   - 适用于 Node.js 环境（VPS、Docker 等）
   - 使用 Koa 框架

2. **Workers 版本** (`src/worker.js`)
   - 适用于 Cloudflare Workers 边缘计算
   - 使用 Hono 框架（专为边缘运行时设计）
   - 全球分布，低延迟
   - 免费套餐 100,000 请求/天

两个版本的 API 完全相同，可以根据需求选择部署方式。

## 自定义域名（可选）

1. 在 Cloudflare 添加你的域名
2. 在 Workers 设置中绑定自定义域名
3. 或在 `wrangler.toml` 中添加：
   ```toml
   routes = [
     { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```

## 故障排除

### Node.js 版本问题
如果遇到 "Wrangler requires at least Node.js v20.0.0"：
```bash
nvm install 20
nvm use 20
```

### 环境变量未生效
确保已设置 secret：
```bash
npx wrangler secret put DEEPSEEK_API_KEY
```

### 部署失败
检查 wrangler.toml 配置是否正确，确保已登录：
```bash
npx wrangler whoami
```

## 成本

Cloudflare Workers 免费套餐：
- 100,000 次请求/天
- 无限流量
- 全球 CDN

超过限额后：
- $5/月（1000 万次请求）
- 适合中小型应用

## 相关链接

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Hono 框架文档](https://hono.dev/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
