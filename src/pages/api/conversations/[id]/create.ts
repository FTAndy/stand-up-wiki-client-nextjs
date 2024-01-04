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

  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const UserUpVoteSpecial = Database.collection("conversation");
  if (request.method === 'post') {

  } else {
    res.status(400)
  }

}