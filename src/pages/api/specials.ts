import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Special = Database.collection("special");

  const {page, name} = (request.query as {
    page: string,
    name: string
  })

  if (typeof page === 'string' && parseInt(page) >= 0) {
    const pipelines: Array<Document> = [
      {
        $sort: {
          'specialDetail.rating': -1,
          '_id': 1
        }
      },
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

    res
    .status(200)
    .json({
      data: specials
    })
  } else {
    res
    .status(404)
  }
}