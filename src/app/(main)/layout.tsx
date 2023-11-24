import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { Analytics } from '@vercel/analytics/react';
import {ReactQueryProvider} from './react-query-provider'
import ThemeProvider from './theme-provider'
import Image from 'next/image'
import Button from '@mui/material/Button';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import GitHubIcon from '@mui/icons-material/GitHub';
import SessionProvider from './session-provider'
import UserAvatar from '@/components/UserAvatar';
import GlobalLogin from '@/components/GlobalSignin';
import './globals.scss'


const inter = Inter({ subsets: ['latin'] })

const pages = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Comedians',
    path: '/comedians'
  },
  {
    name: 'Specials',
    path: '/specials'
  },
  {
    name: 'About',
    path: '/about'
  }
  // {
  //   name: 'Profile',
  //   path: '/profile'
  // },
  // {
  //   name: 'Forum',
  //   path: '/forrm'
  // }
]

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
              <AppBar className='app-bar' position="fixed">
                <Toolbar>
                  <Image 
                    priority={true}
                    src="/logo.jpg"
                    width={50}
                    height={50}
                    alt="Logo"
                  />
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                      <Link key={page.path} className='link' href={page.path} underline="none">
                        {page.name}
                      </Link>            
                    ))}
                  </Box>
                  <Link target='_blank' href="https://github.com/FTAndy/stand-up-wiki-client-nextjs">
                    <Button variant="contained" startIcon={<GitHubIcon className='github-icon'></GitHubIcon>}>
                      Github
                    </Button>
                  </Link>
                  <UserAvatar
                    session={session}
                  />
                  <GlobalLogin />
                </Toolbar>
              </AppBar>
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
