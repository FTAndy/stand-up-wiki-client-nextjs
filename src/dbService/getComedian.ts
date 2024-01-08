import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'
import {ObjectId} from 'mongodb'
import type { Comedian } from '@/types/comdian'


export async function getComedian(id: string) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

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
    // {
    //   $addFields: {
    //     specials: {
    //       $filter: {
    //         input: "$specials",
    //         as: "special",
    //         cond: { $ifNull: ['$$special.TMDBInfo', false] } // Checks if TMDBInfo exists
    //       }
    //     }
    //   }
    // }
  ]).toArray()

  const comedian = comedians.length > 0 ? comedians[0] : null
  

  return comedian as Comedian
}