import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import projectRoutes from './routes/projects'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => c.json({ message: 'Hello Lemon !' }))
app.route('/api/projects', projectRoutes)

const port = process.env.PORT || 30020

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port),
})
