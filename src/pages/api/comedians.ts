import { NextApiRequest, NextApiResponse } from 'next';
import { getComedians } from '@/dbService/getComedians'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const {page = '0', name = '', tags = ''} = (request.query as {
    page?: string,
    name?: string,
    tags?: string
  })

  const comedians = await getComedians(page, name, tags)

  res
  .status(200)
  .json({
    data: comedians
  })

}