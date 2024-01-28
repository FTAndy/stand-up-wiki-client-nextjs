import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import {ReactQueryProvider} from './react-query-provider'
import ThemeProvider from './theme-provider'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import SessionProvider from './session-provider'
import Script from 'next/script'
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
  // @ts-nocheck
/* eslint-disable */
  return (
    <html lang="en">
      <head>
      <Script
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "kst4y9ey0l");`
        }}
      />
      </head>
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
