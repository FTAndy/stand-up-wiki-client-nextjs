import { NextApiRequest, NextApiResponse } from 'next';
import {getMongoDbClient} from '@/service/mongo-client'
import { generateSpeechStream } from '@/utils/elevenLab'
import {ObjectId} from 'mongodb'
import { createThreadAndRunWithAssistant } from '@/utils/openai';
import { threadId } from 'worker_threads';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id: threadId } = req.query as {id: string}
    const { message, messageId, voiceId } = req.body as {message: string, messageId: string, voiceId: string}

    const voiceStream = await generateSpeechStream(message, voiceId)

    if (voiceStream) {
      voiceStream.on('end', () => {
        // TODO: write a relation between message and voice, threadId
      })

      voiceStream.pipe(res)
    } else {
      res.status(405).json({ message: 'Can not transform' })  
    }

  } else {
    res.status(405).json({ message: 'We only support POST' })
  }

}