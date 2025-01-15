import BaseTranslator, { TranslateOptions } from './base'
import { ofetch } from 'ofetch'
import crypto from 'crypto'

interface BaiduRequest {
  from: string
  to: string
  q: string
  appid: string
  salt: string
  sign: string
}

export class BaiduTranslator extends BaseTranslator {
  private baiduHttpPath = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

  private appid = '20240325002004737'

  private secret = '6WWkRg0QPtJiw4jDbZte'

  private genSign(q: string, salt: string) {
    const sign = this.appid + q + salt + this.secret
    return crypto.createHash('md5').update(sign).digest('hex')
  }

  async translate(options: TranslateOptions) {
    const salt = Date.now().toString()
    const sign = this.genSign(options.text, salt)
    const params: BaiduRequest = {
      from: options.from,
      to: options.to,
      q: options.text,
      appid: this.appid,
      salt,
      sign,
    }

    const res = await ofetch(this.baiduHttpPath, {
      method: 'GET',
      params,
    })

    return res?.trans_result?.[0].dst
  }
}

export default BaiduTranslator
