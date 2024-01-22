import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import { generateSpeechStream } from '@/utils/elevenLab'

// TODO: create and transformToVoice API to cloudflare worker or azure function
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id: threadId } = req.query as {id: string}
    const { messageId, voiceId } = req.body as { messageId: string, voiceId: string}

    const MongoClient = await getMongoDbClient()

    const Database = MongoClient.db("standup-wiki");
    const MessageVoiceRelation = Database.collection("messageVoiceRelation");

    MessageVoiceRelation.insertOne({
      messageId: messageId,
      threadId: threadId,
      voiceId,
      createdAt: new Date()
    })

    res.status(200).send('ok')

  } else {
    res.status(405).json({ message: 'We only support POST' })
  }

}