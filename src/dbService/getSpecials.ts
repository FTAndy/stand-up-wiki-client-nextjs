import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'
import type { Special } from '@/types/comdian'

const PAGE_SIZE = 5

export async function getSpeicals(page: string, name: string) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Special = Database.collection("special");
  
  const pipelines: Array<Document> = [
    {
      $sort: {
        'specialDetail.rating': -1,
        '_id': 1
      }
    },
    // {
    //   $match: {
    //     'TMDBInfo': { 
    //       $exists: true,
    //       $ne: null
    //     },  // Filters documents where 'xxx' field exists
    //   }
    // },
    {
      $skip: PAGE_SIZE * (parseInt(page))
    },
    {
      $limit: PAGE_SIZE
    },
    {
      $lookup: {
        from: "comedian", // The related collection you want to join with
        localField: "comedian_id", // The field from collection A that holds the reference
        foreignField: "_id", // The field from collection B that is referenced (usually the _id field)
        as: "comedian" // The name of the new array field to hold the joined documents
      }
    },
    {
      $addFields: {
        comedianName: "$comedian.name" 
      }
    },
  ]

  if (name) {
    pipelines.unshift({
      $match: {
        $text: {
          $search: name,
          $language: "english"
        }
      }
    })
  }

  const specials = await Special.aggregate(pipelines)
  .toArray()
  return specials as Array<Special>
}