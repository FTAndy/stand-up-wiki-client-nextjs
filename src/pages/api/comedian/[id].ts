import { NextApiRequest, NextApiResponse } from 'next';
import MongoClient from '@/service/mongodb'
import {ObjectId} from 'mongodb'

// TODO: Typescript
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  await MongoClient.connect()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  if (id && typeof id === 'string') {
    const comedian = await Comedian.findOne({
      _id: new ObjectId(id) 
    })
    
    res
    .status(200)
    .json({
      comedian
    })
  } else {

  }
}