import { NextApiRequest, NextApiResponse } from 'next';
import MongoClient from '@/service/mongodb'

const PAGE_SIZE = 5


// TODO: Typescript
export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  await MongoClient.connect()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  const {page} = request.query

  let comedians = []

  if (typeof page === 'string' && parseInt(page) >= 1) {
    comedians = await Comedian
    .find({})
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