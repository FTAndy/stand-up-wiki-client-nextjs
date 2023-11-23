import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import {ObjectId} from 'mongodb'
import { z } from "zod";

const UserUpVoteSpecialSchema = z.object({
  userId: z.string(),
  specialId: z.string(),
  isUpVoted: z.boolean()
});


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const { userId, specialId, isUpVoted } = request.body

  console.log(request.body, 'request.body')

  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const UserUpVoteSpecial = Database.collection("userUpVoteSpecial");

  const isValidated = UserUpVoteSpecialSchema.safeParse({
    userId,
    specialId,
    isUpVoted
  })

  if (isValidated.success) {
    await UserUpVoteSpecial.findOneAndUpdate({
      userId,
      specialId,
    }, {
      $set: {
        userId: new ObjectId(userId),
        specialId: new ObjectId(specialId),
        isUpVoted,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    }, { upsert: true })



    res
    .status(200)
    .end()
  
  } else {
    res.status(400)
    .end()
  }

}