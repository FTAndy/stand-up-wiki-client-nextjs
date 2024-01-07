import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import openai, {sendMessageToThread} from '@/utils/openai'
import {ObjectId} from 'mongodb'
import { createThreadAndRunWithAssistant } from '@/utils/openai';
import { threadId } from 'worker_threads';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id: threadId } = req.query as {id: string}
    const { message, assistantId } = req.body as {message: string, assistantId: string}

    const {answer} = await sendMessageToThread(threadId, message, assistantId)

    res.status(200).json({
      data: {
        answer
      }
    })
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }

}