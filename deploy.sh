#!/bin/bash

# 运行 Prisma 数据库迁移
npx prisma migrate deploy

# 生成 Prisma 客户端
npx prisma generate

# 数据库初始化
npx prisma db seed

# 运行默认的 Next.js 构建命令
npx next build
