import { Hono } from 'hono'
import { translationController } from '../controllers/translations'

const translations = new Hono()

translations.post('/', translationController.create)
translations.post('/list', translationController.findTranslations)
translations.post('/key', translationController.findByKey)

translations.post('/upload', translationController.setTranslationByFile)

export default translations
