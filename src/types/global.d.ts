import type { MongoClient } from 'mongodb'

declare global {
  var mongoClientPromise: Promise<MongoClient>
}
