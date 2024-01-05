import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import openai from '@/utils/openai'
import {ObjectId} from 'mongodb'
import { createThreadAndRunWithAssistant } from '@/utils/openai';
import { threadId } from 'worker_threads';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { assistantId } = req.body as {assistantId: string}

    const {answer, thread_id} = await createThreadAndRunWithAssistant(assistantId)
    
    res.status(200).json({
      data: {
        threadId: thread_id,
        answer
      }
    })
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }

}