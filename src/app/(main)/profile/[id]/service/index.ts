import request from '@/service'

export function specialUpVote(data: {
  userId: string,
  specialId: string,
  isUpVoted: boolean
}) {
  return request.post('/api/special/upVote', data)
}

export async function getSpecialDetail(data: {
  specialId: string,
  userId: string | undefined
}) {
  const res = await request.post(`/api/specials/${data.specialId}`, data)
  return res.data.data
}