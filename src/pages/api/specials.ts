import { NextApiRequest, NextApiResponse } from 'next';
import { getSpeicals } from '@/dbService/getSpecials'

export default async function handle(request: NextApiRequest, res: NextApiResponse) {

  const {page, name} = (request.query as {
    page: string,
    name: string
  })

  if (typeof page === 'string' && parseInt(page) >= 0) {
    const specials = await getSpeicals(page, name)

    res
    .status(200)
    .json({
      data: specials
    })
  } else {
    res
    .status(404)
  }
}