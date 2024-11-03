import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import projectRoutes from './routes/projects'

const app = new Hono()

app.use('/*', cors())

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'i18n',
})

export const db = drizzle(pool)

app.get('/', (c) => c.json({ message: 'Hello Lemon !' }))
app.route('/api/projects', projectRoutes)

export default app
