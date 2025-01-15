export interface TranslateOptions {
  from: string
  to: string
  text: string
}

class BaseTranslator {
  async translate(options: TranslateOptions) {
    return options.text
  }
}

export default BaseTranslator
