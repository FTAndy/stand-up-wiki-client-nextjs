import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({
  // https://api.openai-proxy.com
  ...(process.env.NODE_ENV === 'development' ? {
    baseURL: 'https://openai.wndbac.cn/v1'
  }: {}),
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export default openai