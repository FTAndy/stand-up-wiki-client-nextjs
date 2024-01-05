import 'dotenv/config'
import { reject } from 'lodash';
import OpenAI from 'openai'
import type { MessageContentText } from 'openai/resources/beta/threads/messages/messages'

const openai = new OpenAI({
  // https://api.openai-proxy.com
  ...(process.env.NODE_ENV === 'development' ? {
    baseURL: 'https://openai.wndbac.cn/v1'
  }: {}),
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function createThreadAndRunWithAssistant(assistantId: string) {
  try {
    const topics = ['Family and Relationships', 'Mental Health', 'Social Observations', 'Personal Anecdotes and Self-Deprecation:', 'Controversial or Taboo Topics']

    const {id: messageId, thread_id} = await openai.beta.threads.createAndRun({
      assistant_id: assistantId,
      thread: {
        messages: [
          {
            role: 'user',
            content: `create a joke about ${topics[0]}`
          }
        ]      
      }
    })

    await new Promise((resolve) => {
      let timeout = setInterval(async () => {
        try {
          const runTask = await openai.beta.threads.runs.retrieve(thread_id, messageId)
          if (runTask.status === 'completed') {
            clearInterval(timeout)
            resolve(runTask)
          }        
        } catch (error) {
          clearInterval(timeout)
          reject('error')
        }
      }, 500)
    })

  
    const messageList = await openai.beta.threads.messages.list(thread_id)

    const result = messageList.data[0].content[0] as MessageContentText

    const answer = result.text.value  
    return {
      answer,
      thread_id
    }  
  } catch (error) {
    console.log(error)
    throw new Error('fetch open api error')
  }
}

export default openai