import BaiduTranslator from './engines/baidu'
import GoogleTranslator from './engines/google'
import BaseTranslator, { TranslateOptions } from './engines/base'

const translators: Record<string, BaseTranslator> = {
  baidu: new BaiduTranslator(),
  google: new GoogleTranslator(),
}

class Translator {
  constructor(private engine: string) {}

  async translate(options: TranslateOptions & { engine: string }) {
    const engine = translators[options.engine] ?? translators.baidu
    return engine.translate(options)
  }
}

export default Translator
