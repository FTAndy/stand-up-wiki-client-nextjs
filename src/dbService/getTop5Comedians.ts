import { cache } from 'react'
import {getMongoDbClient} from '@/service/mongo-client'
import { Comedian } from '@/types/comdian';

export const getTop5Comedians = cache(async () => {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  const orderedNames = ['George Carlin', 'Dave Chappelle', 'Louis C.K.', 'Bill Burr', 'Richard Pryor'];

  // TODO: cache to redis
  const comedians = await Comedian.find<Comedian>({
    name: { $in: orderedNames }
  }).toArray()

  console.log('query!!!!!!')

  const sortedComedians = orderedNames.map(name => comedians.find(comedian => comedian.name === name)).filter(comedian => comedian !== undefined);

  const comedianCovers = sortedComedians.map((s, index) => {
    return {
      id: index,
      comedianId: s?._id.toString(),
    }
  })
  return comedianCovers
})
