import BaseTranslator, { TranslateOptions } from './base'

export class BaiduTranslator extends BaseTranslator {
  async translate(options: TranslateOptions) {
    return options.text
  }
}

export default BaiduTranslator
