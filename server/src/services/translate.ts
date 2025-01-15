export class TranslateService {
  async translate(from: string, to: string, text: string) {
    const response = await fetch(
      `https://api.openai.com/v1/engines/gpt-3.5-turbo/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          prompt: `Translate the following text from ${from} to ${to}: ${text}`,
        }),
      }
    )

    return response.json()
  }
}

export const translateService = new TranslateService()
