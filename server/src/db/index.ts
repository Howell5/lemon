// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = 'postgres://postgres:postgres@localhost:5432/i18n'

// 创建 postgres 连接
const client = postgres(connectionString)

// 创建 drizzle 实例
export const db = drizzle(client, { schema })
