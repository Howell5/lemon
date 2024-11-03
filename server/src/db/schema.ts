// schema.ts
import { pgTable, serial, text, timestamp, varchar, json } from 'drizzle-orm/pg-core'

// 项目表
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  defaultLocale: varchar('default_locale', { length: 10 }).notNull(),
  supportedLocales: json('supported_locales').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// 翻译条目表
export const translations = pgTable('translations', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => projects.id),
  key: varchar('key', { length: 255 }).notNull(),
  namespace: varchar('namespace', { length: 100 }),
  translations: json('translations').$type<Record<string, string>>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// TODO: 审计日志表 和 变更历史表, for 二期
