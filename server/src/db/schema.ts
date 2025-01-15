// schema.ts
import {
  pgTable,
  integer,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  json,
} from 'drizzle-orm/pg-core'

// export enum Locale {
//   EN = 'en',
//   ZH = 'zh',
//   FR = 'fr',
//   DE = 'de',
//   ES = 'es',
//   IT = 'it',
//   JA = 'ja',
//   KO = 'ko',
// }

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
  projectId: integer('project_id').references(() => projects.id),
  key: text('key').notNull(),
  // one of enum Locale type
  locale: varchar('locale', { length: 30 }).notNull(),
  isLeaf: boolean('is_leaf').notNull().default(false),
  // string
  translation: text('translation').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// TODO: 审计日志表 和 变更历史表, for 二期
