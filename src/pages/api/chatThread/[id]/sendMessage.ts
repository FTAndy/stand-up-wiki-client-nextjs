import { NextApiRequest, NextApiResponse } from 'next';
import openai, {sendMessageToThread} from '@/utils/openai'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id: threadId } = req.query as {id: string}
    const { message, assistantId } = req.body as {message: string, assistantId: string}

    const {answer, respondMessageId} = await sendMessageToThread(threadId, message, assistantId)

    res.status(200).json({
      data: {
        answer,
        respondMessageId
      }
    })
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }

}