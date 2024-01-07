import request from '@/service'

export async function createChatThread(assistantId: string) {
  const res = await request.post<{
    data: {
      threadId: string
      answer: string,
      respondMessageId: string
    }
  }>('/api/chatThread/create', {assistantId})
  const data = res.data
  return data.data
}

export async function sendMessageToThread(threadId: string, message: string, assistantId: string) {
  const res = await request.post<{
    data: {
      answer: string,
      respondMessageId: string
    }
  }>(`/api/chatThread/${threadId}/sendMessage`, {
    message,
    assistantId
  })
  const data = res.data
  return data.data
}