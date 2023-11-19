import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { Analytics } from '@vercel/analytics/react';
import {SWRProvider} from './swr-provider'
import ThemeProvider from './theme-provider'
import Image from 'next/image'
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{overflow: 'auto'}} className={inter.className}>
      <div className='App'>
        <SWRProvider>
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
              </Toolbar>
            </AppBar>
            {children}        
          </ThemeProvider>
        </SWRProvider>
      </div>
      <Analytics />
      </body>
    </html>
  )
}
