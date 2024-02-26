import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(request: NextApiRequest, res: NextApiResponse) {


    res
    .status(200)
    .json({
      data: 'hello '
    })

}
