import { Hono } from 'hono'
import { SUPPORTED_LOCALE_MAP } from '../constants'

const localesRoutes = new Hono()

localesRoutes.get('/list', (c) => {
  const locales = SUPPORTED_LOCALE_MAP

  return c.json({ locales })
})

export default localesRoutes
