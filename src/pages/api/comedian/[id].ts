import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import {ObjectId} from 'mongodb'

// TODO: Typescript
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  if (id && typeof id === 'string') {
    const comedians = await Comedian.aggregate([
      {
        $match: {
          _id: new ObjectId(id) 
        }
      },
      {
        $lookup: {
          from: 'special',
          localField: '_id',
          foreignField: 'comedian_id',
          as: 'specials'
        }
      },
      {
        $unwind: "$specials" // Deconstructs the specials array
      },
    ]).toArray()

    const comedian = comedians.length > 0 ? comedians[0] : null
    
    res
    .status(200)
    .json({
      data: comedian
    })
  } else {
    res
    .status(404)
  }
}