'use server'
import * as React from 'react';
import SessionProvider from '@/app/(main)/session-provider'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

interface ISessionServerProviderProps {
  children: any
}

export default async function SessionServerProvider(props: ISessionServerProviderProps) {
  const session = await getServerSession(authOptions)
  const { children } = props
  return <SessionProvider session={session}>
    { children }
  </SessionProvider>;
};

