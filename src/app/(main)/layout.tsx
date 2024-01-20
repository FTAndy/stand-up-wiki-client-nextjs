import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import {ReactQueryProvider} from './react-query-provider'
import ThemeProvider from './theme-provider'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import SessionProvider from './session-provider'
import HeaderBar from '@/components/HeaderBar'
import './globals.scss'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: 'Standup Wiki',
  title: 'Standup Wiki',
  referrer: 'origin-when-cross-origin',
  description: 'Standup Wiki, watch standup specials for free',
  keywords: ['standup comedy', 'standup comedians', 'standup specials', 'free standup specials'],
  creator: 'Andy Qin',

  icons: {
    icon: '/icon.jpeg'
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: This will opt-out of cache for all pages, need to find a way to opt-in, and it 
  const session = await getServerSession(authOptions)


  // TODO: all image use highest quality and with next/image to show
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='App'>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ThemeProvider options={{ key: 'mui', prepend: true }}>
              <HeaderBar 
                session={session}
               />
              {children}        
            </ThemeProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </div>
      <Analytics />
      </body>
    </html>
  )
}
