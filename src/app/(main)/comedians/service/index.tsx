import request from '@/service'

export async function getComedianNames() {
  const res = await request.get('/api/comedianNames')
  return res.data
}