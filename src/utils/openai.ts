import { debug, log } from 'console';
import 'dotenv/config'
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

    const index = Math.floor(Math.random() * topics.length)

    const {id: runId, thread_id} = await openai.beta.threads.createAndRun({
      assistant_id: assistantId,
      thread: {
        messages: [
          {
            role: 'user',
            content: `create a joke about ${topics[index]}`
          }
        ]      
      }
    })

    await new Promise((resolve, reject) => {
      let timeout = setInterval(async () => {
        try {
          const runTask = await openai.beta.threads.runs.retrieve(thread_id, runId)
          if (runTask.status === 'completed') {
            clearInterval(timeout)
            resolve(runTask)
          }        
        } catch (error) {
          clearInterval(timeout)
          reject(error)
        }
      }, 500)
    })

  
    const messageList = await openai.beta.threads.messages.list(thread_id, {
      limit: 1
    })

    const result = messageList.data[0].content[0] as MessageContentText

    const respondMessageId = messageList.data[0].id

    const answer = result.text.value  
    return {
      answer,
      thread_id,
      respondMessageId
    }  
  } catch (error) {
    console.log(error)
    throw new Error('fetch open api error')
  }
}

export async function sendMessageToThread(threadId: string, message: string, assistant_id: string) {
  try {
    console.log('creat task')
    const {id: messageId} = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message
    })

    console.log(threadId, assistant_id, 'threadId, assistant_id')

    const {id: runId} = await openai.beta.threads.runs.create(threadId, {
      assistant_id
    })

    await new Promise((resolve, reject) => {
      let timeout = setInterval(async () => {
        try {
          debug
          const runTask = await openai.beta.threads.runs.retrieve(threadId, runId)
          if (runTask.status === 'completed') {
            clearInterval(timeout)
            resolve(runTask)
          }
        } catch (error) {
          clearInterval(timeout)
          reject(error)
        }
      }, 500)
    })

  
    const messageList = await openai.beta.threads.messages.list(threadId, {
      limit: 1
    })

    console.log(messageList, 'messageList')

    const result = messageList.data[0].content[0] as MessageContentText
    
    const respondMessageId = messageList.data[0].id

    const answer = result.text.value  

    return {
      answer,
      respondMessageId
    }  
  } catch (error) {
    console.log(error)
    throw new Error('fetch open api error')
  }
}

export default openai