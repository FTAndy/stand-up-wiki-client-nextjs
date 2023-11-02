import { NextApiRequest, NextApiResponse } from 'next';
import MongoClient from '@/service/mongodb'

// TODO: Typescript
export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  await MongoClient.connect()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  const cursor = await Comedian.find()

  const comedians = await cursor.toArray();

  res
  .status(200)
  .json({
    comedians
  })
}