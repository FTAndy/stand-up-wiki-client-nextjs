import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'
import type { DigitalFigure } from '@/types/digitalFigure'


export async function getComedianDigitalFigures () {
  const MongoClient = await getMongoDbClient()
  const Database = MongoClient.db("standup-wiki");
  const ComedianDigitalFigures = Database.collection("comedianDigitalFigure");

  console.log('digitalFigures', '2')

  const comedianDigitalFigures = await ComedianDigitalFigures.find({}).toArray()

  return comedianDigitalFigures as unknown as Array<DigitalFigure>
}
