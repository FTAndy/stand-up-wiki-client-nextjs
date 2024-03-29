import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'
import type { Comedian } from '@/types/comdian'

const PAGE_SIZE = 5

export async function getComedians(page: string, name: string, tags: string) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

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

  const comedians = await Comedian.aggregate(pipelines)
  .toArray()

  return comedians as Array<Comedian>

}