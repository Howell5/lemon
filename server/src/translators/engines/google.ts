import BaseTranslator, { TranslateOptions } from './base'
import { ofetch } from 'ofetch'

interface GoogleRequest {
  q: string
  target: string
  source?: string
  key: string
}

export class GoogleTranslator extends BaseTranslator {
  private googleHttpPath =
    'https://translation.googleapis.com/language/translate/v2'

  private apiKey = 'AIzaSyD86-59-80-90-59-80-90-59-80-90-59-80-90'

  async translate(options: TranslateOptions) {
    const params: GoogleRequest = {
      q: options.text,
      target: options.to,
      source: options.from,
      key: this.apiKey,
    }

    const res = await ofetch(this.googleHttpPath, {
      method: 'GET',
      params,
    })

    return res?.data?.translations?.[0]?.translatedText
  }
}

export default GoogleTranslator
