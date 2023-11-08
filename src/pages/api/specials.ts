import { NextApiRequest, NextApiResponse } from 'next';
import MongoClient from '@/service/mongodb'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  await MongoClient.connect()

  const Database = MongoClient.db("standup-wiki");
  const Special = Database.collection("special");

  const {page, name} = (request.query as {
    page: string,
    name: string
  })

  if (typeof page === 'string' && parseInt(page) >= 1) {
    let specials = []
    const filter: {
      name?: string
    } = {}
    if (name) {
      filter.name = name
    }
    specials = await Special
    .find(filter)
    .sort({ 
      'specialDetail.rating': -1
    })
    .skip(PAGE_SIZE * (parseInt(page) - 1))
    .limit(PAGE_SIZE)
    .toArray()

    res
    .status(200)
    .json(specials)
  } else {
    res
    .status(404)
  }
}