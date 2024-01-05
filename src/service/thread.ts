import request from '@/service'

export function createChatThread(comedianId: string) {
  return request.post('/api/chatThread/create', {comedianId})
}