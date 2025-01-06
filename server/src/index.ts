import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import projectRoutes from './routes/projects'
import translationRoutes from './routes/translations'
import localesRoutes from './routes/locales'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => c.json({ message: 'Hello Lemon !' }))
app.route('/api/project', projectRoutes)
app.route('/api/translation', translationRoutes)
app.route('/api/locale', localesRoutes)

const port = process.env.SERVER_PORT || 5000

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  hostname: 'local.lemon.me',
  port: Number(port),
})
