import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import {ReactQueryProvider} from './react-query-provider'
import ThemeProvider from './theme-provider'
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
  return (
    <html lang="en">
      <head>
        <Script
          id="clarity"
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
      <ReactQueryProvider>
        <ThemeProvider options={{ key: 'mui', prepend: true }}>
          <div className='App'>
            <HeaderBar
            />
            {children}
          </div>
        </ThemeProvider>
      </ReactQueryProvider>
      <Analytics />
      </body>
    </html>
  )
}
