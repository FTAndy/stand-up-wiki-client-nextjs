import { NextApiRequest, NextApiResponse } from 'next';
import { createThreadAndRunWithAssistant } from '@/utils/openai';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { assistantId } = req.body as {assistantId: string}

    const {answer, thread_id, respondMessageId} = await createThreadAndRunWithAssistant(assistantId)
    
    res.status(200).json({
      data: {
        threadId: thread_id,
        answer,
        respondMessageId
      }
    })
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }

}