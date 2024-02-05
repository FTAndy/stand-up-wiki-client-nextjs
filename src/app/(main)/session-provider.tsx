'use client'
import { SessionProvider } from "next-auth/react"
import type { Session } from 'next-auth'

export default function SessionClientProvider({ children, session }: {
  children: any,
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
