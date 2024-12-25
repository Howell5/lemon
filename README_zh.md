# Lemon 🍋

[English](./README_EN.md) | 简体中文

> 一个现代化的国际化翻译管理系统 —— 让多语言开发不再酸涩。

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.13-00DC82?logo=nuxt.js)](https://nuxt.com/)
[![Hono](https://img.shields.io/badge/Hono-4.6-E36002?logo=hono)](https://hono.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

## 🌟 特性

- 💪 **全栈 TypeScript** - 端到端类型安全
- 🚀 **现代技术栈** - Nuxt 3 + Vue 3 + Hono + Drizzle ORM
- 🔄 **实时协作** - 基于 WebSocket 的实时编辑和通知
- 🔌 **简单集成** - RESTful API 和 TypeScript SDK
- 📦 **批量操作** - 支持 JSON 格式的导入导出
- 🎯 **项目隔离** - 多项目支持，权限独立
- 🔑 **OAuth 支持** - 轻松接入企业认证系统

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- PostgreSQL >= 14
- pnpm >= 8

### 安装

```bash
# 克隆项目
git clone https://github.com/howell5/lemon.git

# 安装依赖
cd lemon
pnpm install

# 配置环境变量
cp .env.example .env

# 数据库结构同步
pnpm db:generate

# 数据库迁移
pnpm db:migrate

# 启动开发服务器
pnpm dev


```

## 🏗️ 技术架构

```
├── client                 # Nuxt 3 前端应用
│   ├── components/       # Vue 组件
│   ├── composables/      # 组合式函数
│   ├── pages/           # 路由页面
│   └── types/           # TypeScript 类型
│
├── server                # Hono 后端服务
│   ├── api/             # API 路由
│   ├── db/              # 数据库相关
│   ├── services/        # 业务逻辑
│   └── websocket/       # WebSocket 处理
│
└── packages             # 工具包
    └── sdk/             # TypeScript SDK
```

## 🔧 本地开发

```
# 安装依赖
pnpm install

# 启动开发
pnpm dev

# 构建生产版本
pnpm build

# 运行测试
pnpm test
```

## 📚 API 文档

API 文档使用 OpenAPI 3.0 规范，可以在开发环境下访问：

bash

复制

```
http://localhost:3000/api/docs
```

## 🎮 开发指南

### 代码风格

项目使用 ESLint 和 Prettier 进行代码规范，提交前请确保代码符合规范：

bash

复制

```
# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

bash

复制

```
git commit -m "feat: 添加多语言切换功能"
git commit -m "fix: 修复翻译保存失败问题"
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 MIT 开源协议。

---
