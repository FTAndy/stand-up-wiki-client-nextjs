import request from '@/service'

export function specialUpVote(data: {
  userId: string,
  specialId: string,
  isUpVoted: boolean
}) {
  return request.post('/api/special/upVote', data)
}

export async function getSpecialUpVotes(data: {
  specialId: string,
}): Promise<number> {
  const res = await request.post('/api/special/getUpVotesCount', data)
  return res.data.data
}