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
  const session = await getServerSession(authOptions)


  // TODO: add srcset for low resolution device, windows and mac is different
  // TODO: add Sentry
  return (
    <html lang="en">
      <body style={{overflow: 'auto'}} className={inter.className}>
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
