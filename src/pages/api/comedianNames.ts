import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");


  const comedians = await Comedian
  .find({})
  .project({
    name: 1
  })
  .toArray();

  res
  .status(200)
  .json(comedians)

}