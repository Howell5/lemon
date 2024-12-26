# Lemon 🍋

English | [简体中文](./README_zh.md)

> A modern i18n management system - Making multi-language development less sour.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.13-00DC82?logo=nuxt.js)](https://nuxt.com/)
[![Hono](https://img.shields.io/badge/Hono-4.6-E36002?logo=hono)](https://hono.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 🌟 Features

- 💪 **Full-stack TypeScript** - End-to-end type safety
- 🚀 **Modern Stack** - Nuxt 3 + Vue 3 + Hono + Drizzle ORM
- 🔄 **Real-time Collaboration** - WebSocket-based real-time editing and notifications
- 🔌 **Easy Integration** - RESTful API and TypeScript SDK
- 📦 **Batch Operations** - JSON format import/export support
- 🎯 **Project Isolation** - Multi-project support with independent permissions
- 🔑 **OAuth Support** - Seamless enterprise authentication integration

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- pnpm >= 8

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lemon.git

# Install dependencies
cd lemon
pnpm install

# Configure environment variables
cp .env.example .env

# Run database generate
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

## 🏗️ Architecture

```
├── client                 # Nuxt 3 frontend application
│   ├── components/       # Vue components
│   ├── composables/      # Composables
│   ├── pages/           # Route pages
│   └── types/           # TypeScript types
│
├── server                # Hono backend service
│   ├── api/             # API routes
│   ├── db/              # Database related
│   ├── services/        # Business logic
│   └── websocket/       # WebSocket handlers
│
└── packages             # Utilities
    └── sdk/             # TypeScript SDK
```

## 🔧 Local Development

```bash
# Install dependencies
pnpm install

# Start frontend development server
pnpm dev:client

# Start backend development server
pnpm dev:server

# Build for production
pnpm build

# Run tests
pnpm test
```

## 📚 API Documentation

API documentation follows OpenAPI 3.0 specification and is available at:

```bash
http://localhost:3000/api/docs
```

## 🎮 Development Guide

### Code Style

We use ESLint and Prettier for code standardization:

```bash
# Run linter
pnpm lint

# Format code
pnpm format
```

### Commit Convention

Following [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add language switcher"
git commit -m "fix: resolve translation save issue"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
