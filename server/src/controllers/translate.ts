import { TranslateService } from '../services/translate'

const translateService = new TranslateService()

export class TranslateController {
  async translate(from: string, to: string, text: string) {
    return await translateService.translate(from, to, text)
  }
}

export const translateController = new TranslateController()
