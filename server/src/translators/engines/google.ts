import BaseTranslator, { TranslateOptions } from './base'

export class GoogleTranslator extends BaseTranslator {
  async translate(options: TranslateOptions) {
    return options.text
  }
}

export default GoogleTranslator
