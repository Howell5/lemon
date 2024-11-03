#!/bin/bash
echo "Starting development environment..."

# 启动数据库
docker-compose up -d

# 等待数据库就绪
echo "Waiting for database to be ready..."
sleep 3

# 运行数据库迁移
echo "Running database migrations..."
pnpm db:migrate

# 启动开发服务器
echo "Starting development servers..."
cd server && pnpm dev &
cd client && pnpm dev
