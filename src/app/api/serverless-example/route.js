import { NextResponse } from 'next/server';
import Dave from './mock'
import clientPromise from '@/service/mongodb'

// TODO: Typescript
export async function GET(request) {
  const client = await clientPromise

  const myDB = client.db("standup-wiki");
  const Comedian = myDB.collection("comedian");

  await Comedian.insertOne(Dave)

  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}