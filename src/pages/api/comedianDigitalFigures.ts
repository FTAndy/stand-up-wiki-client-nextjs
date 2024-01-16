import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import type { Document } from 'mongodb'
import { getComedianDigitalFigures } from '@/dbService/getComedianDigitalFigures'

const PAGE_SIZE = 5


export default async function handle(request: NextApiRequest, res: NextApiResponse) {
  const comedianDigitalFigures = await getComedianDigitalFigures()

  res
  .status(200)
  .json({
    data: comedianDigitalFigures
  })
}