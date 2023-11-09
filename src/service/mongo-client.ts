import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || ''
const options = {}


if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function getMongoClient() {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentiatlly
   * during API Route usage.
   * https://github.com/vercel/next.js/pull/17666
   */
  if (!global.mongoClientPromise) {
    const client = new MongoClient(uri);
    // client.connect() returns an instance of MongoClient when resolved
    global.mongoClientPromise = client.connect()
  }
  return global.mongoClientPromise;
}

export async function getMongoDbClient() {
  const mongoClient = await getMongoClient();
  return mongoClient
}