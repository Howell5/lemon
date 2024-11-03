import type { Config } from 'drizzle-kit'

export default {
  schema: './server/src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // 改为 'pg'
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'i18n',
  },
} satisfies Config
