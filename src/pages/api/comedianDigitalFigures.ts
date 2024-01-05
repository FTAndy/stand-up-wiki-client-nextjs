import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const ComedianDigitalFigures = Database.collection("comedianDigitalFigure");

  const comedianDigitalFigures = await ComedianDigitalFigures.find({})
  .toArray()

  res
  .status(200)
  .json({
    data: comedianDigitalFigures
  })
}