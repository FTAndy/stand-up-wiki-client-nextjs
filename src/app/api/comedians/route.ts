import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import MongoClient from '@/service/mongodb'

// TODO: Typescript
export async function GET(request: NextRequest) {
  await MongoClient.connect()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  const cursor = await Comedian.find({
    name: 'Dave Chappelle'
  })

  const comedians = await cursor.toArray();


  return NextResponse.json(
    {
      comedians
    },
    {
      status: 200,
    },
  );

  // response
  // .status(200)
  // .send({
  //   body: {
  //     comedian
  //   },
  //   // path: request.,
  //   query: request.query,
  //   cookies: request.cookies,
  // })
}