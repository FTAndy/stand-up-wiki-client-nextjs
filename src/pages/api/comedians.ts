import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");


  const {page = '0', name, tags} = (request.query as {
    page?: string,
    name?: string,
    tags?: string
  })

  let comedians = []

  const pipelines: Array<Document> = [
    {
      $sort: {
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
        from: "special", // The related collection you want to join with
        localField: "_id", // The field from collection A that holds the reference
        foreignField: "comedian_id", // The field from collection B that is referenced (usually the _id field)
        as: "specials" // The name of the new array field to hold the joined documents
      }
    },
    {
      $addFields: {
        specialSize: { $size: "$specials" } // Add a field that counts the number of related documents
      }
    },
  ]

  if (name) {
    pipelines.unshift({
      $sort: {
        score: { $meta: "textScore" }, // Sort by text search relevance
        otherField: 1 // Additional sorting criteria (optional)
      }
    })
    pipelines.unshift({
      $match: {
        $text: {
          $search: name,
          $language: "english"
        }
      },
    })
  }

  if (tags && tags.length > 0) {
    const filterTags = tags.split(',')
    if (filterTags.length > 0) {
      pipelines.unshift({
        $match: {
          'AIGeneratedContent.tags': {
            $in: filterTags
          }
        },
      })
    }
  }

  comedians = await Comedian.aggregate(pipelines)
  .toArray()

  res
  .status(200)
  .json({
    data: comedians
  })

}