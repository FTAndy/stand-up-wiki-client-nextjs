import request from '@/service'

export async function createChatThread(assistantId: string) {
  const res = await request.post<{
    data: {
      threadId: string
      answer: string
    }
  }>('/api/chatThread/create', {assistantId})
  const data = res.data
  return data.data
}