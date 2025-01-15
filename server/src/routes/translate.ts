import { Hono } from 'hono'
import { translateController } from '../controllers/translate'

const translate = new Hono()

translate.post('/', async (c) => {
  const { from, to, text } = await c.req.json()
  const result = await translateController.translate(from, to, text)
  return c.json(result)
})

export default translate
