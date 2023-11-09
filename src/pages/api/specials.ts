import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Special = Database.collection("special");

  const {page, name} = (request.query as {
    page: string,
    name: string
  })

  if (typeof page === 'string' && parseInt(page) >= 1) {
    let specials = []
    const filter: {
      name?: {}
    } = {}
    if (name) {
      filter.name = {
        $regex: name, 
        $options: 'i' // this makes the search case-insensitive
      }
    }
    specials = await Special
    .find(filter)
    .sort({ 
      'specialDetail.rating': -1,
      '_id': 1
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