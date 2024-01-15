import request from '@/service'
import { getAIServiceUrl } from '@/utils/getPublicPath'

export async function createChatThread(assistantId: string) {
  const res = await request.post<{
    data: {
      threadId: string
      answer: string,
      respondMessageId: string
    }
  }>(`${getAIServiceUrl()}/api/chatThread/create`, {assistantId})
  const data = res.data
  return data.data
}

export async function sendMessageToThread(threadId: string, message: string, assistantId: string) {
  const res = await request.post<{
    data: {
      answer: string,
      respondMessageId: string
    }
  }>(`${getAIServiceUrl()}/api/chatThread/${threadId}/sendMessage`, {
    message,
    assistantId
  })
  const data = res.data
  return data.data
}

export async function transformToVoice(threadId: string, message: string, messageId: string, voiceId: string) {
  const response = await fetch(`${getAIServiceUrl()}/api/chatThread/${currentComedianChatThread.threadId}/transformToVoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: props.content.text, 
      messageId: props.content.messageId, 
      voiceId: currentVoiceId
    })
  })
  const data = res.data
  return data.data
}