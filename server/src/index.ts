import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import projectRoutes from './routes/projects'
import translationRoutes from './routes/translations'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => c.json({ message: 'Hello Lemon !' }))
app.route('/api/projects', projectRoutes)
app.route('/api/translations', translationRoutes)

const port = process.env.SERVER_PORT || 5000

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port),
})
