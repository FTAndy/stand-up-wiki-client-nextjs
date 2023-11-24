import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import {ObjectId} from 'mongodb'
import { z } from "zod";

const UserUpVoteSpecialSchema = z.object({
  specialId: z.string(),
});


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const { specialId } = request.body

  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const UserUpVoteSpecial = Database.collection("userUpVoteSpecial");

  const isValidated = UserUpVoteSpecialSchema.safeParse({
    specialId,
  })

  if (isValidated.success) {
    const count = await UserUpVoteSpecial.countDocuments({
      specialId: new ObjectId(specialId)
    })

    res
    .status(200)
    .json({
      data: count
    })
  
  } else {
    res.status(400)
    .end()
  }

}