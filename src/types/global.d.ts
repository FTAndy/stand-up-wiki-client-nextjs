import type { MongoClient } from 'mongodb'
import type Hls from 'hls.js'

declare global {
  var mongoClientPromise: Promise<MongoClient>
  interface Window {
    hls: Hls
  }
}
