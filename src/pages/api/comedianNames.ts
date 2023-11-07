import { NextApiRequest, NextApiResponse } from 'next';
import MongoClient from '@/service/mongodb'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  await MongoClient.connect()

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