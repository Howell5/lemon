import { Hono } from 'hono'
import { translationController } from '../controllers/translations'

const translations = new Hono()

translations.post('/', translationController.create)
// translations.get('/', translationController.findAll)
// translations.get('/:id', translationController.findOne)
translations.put('/:key', translationController.update)
// translations.delete('/:id', translationController.delete)
translations.post('/list', translationController.findTranslations)

translations.post('/upload', translationController.setTranslationByFile)

export default translations
