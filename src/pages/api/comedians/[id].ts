import { NextApiRequest, NextApiResponse } from 'next';
import { getComedian } from '@/dbService/getComedian'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id && typeof id === 'string') {
    const comedian = await getComedian(id)
    
    res
    .status(200)
    .json({
      data: comedian
    })
  } else {
    res
    .status(404)
  }
}