import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import {ObjectId} from 'mongodb'
import type { Document } from 'mongodb'
import { z } from "zod";

const GetDetail = z.object({
  specialId: z.string(),
});


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const { specialId, userId } = request.body

  console.log(specialId, userId, 'specialId, userId')

  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Special = Database.collection("special");

  const isValidated = GetDetail.safeParse({
    specialId,
  })

  if (isValidated.success) {
    let pipeline: Array<Document> = [
      {
        $match: {
          _id: new ObjectId(specialId)
        }
      },
      {
        $lookup: {
          from: "userUpVoteSpecial", // The related collection you want to join with
          localField: "_id", // The field from collection A that holds the reference
          foreignField: "specialId", // The field from collection B that is referenced (usually the _id field)
          as: "userUpVotes", // The name of the new array field to hold the joined documents
          pipeline: [
            {
              $match: {
                'isUpVoted': true
              }
            }
          ],
        }
      },
      {
        $addFields: {
          upVoteCount: { $size: "$userUpVotes" }  // Count the number of comments for each post
        }
      }
    ]

    // TODO: integrate upVote Counts
    if (userId) {
      pipeline = [
        ...pipeline,
        {
          $lookup: {
            from: "userUpVoteSpecial", // The related collection you want to join with
            localField: "_id", // The field from collection A that holds the reference
            foreignField: "specialId", // The field from collection B that is referenced (usually the _id field)
            as: "curUserUpVotes", // The name of the new array field to hold the joined documents
            pipeline: [
              {
                $match: {
                  'userId': new ObjectId(userId)
                }
              }
            ],
          }
        },
        {
          $addFields: {
            userUpVote: { $arrayElemAt: ["$curUserUpVotes", 0] }
          }
        }
      ]
    }

    const specials = await Special.aggregate(pipeline).toArray()

    res
    .status(200)
    .json({
      data: specials[0]
    })
  
  } else {
    res.status(400)
    .end()
  }

}