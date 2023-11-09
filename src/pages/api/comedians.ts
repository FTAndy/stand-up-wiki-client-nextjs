import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  const {page, name} = (request.query as {
    page: string,
    name: string
  })

  let comedians = []

  if (typeof page === 'string' && parseInt(page) >= 1) {
    const filter: {
      name?: {
      }
    } = {}
    if (name) {
      filter.name = {
        $search: name
      }
    }
    comedians = await Comedian
    .find(filter)
    .skip(PAGE_SIZE * (parseInt(page) - 1))
    .limit(PAGE_SIZE)
    .toArray()
  } else {
    comedians = await Comedian.find({}).toArray();
  }

  res
  .status(200)
  .json({
    comedians
  })
}