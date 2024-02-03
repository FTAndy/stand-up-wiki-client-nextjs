'use server'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Link from 'next/link'
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import UserAvatar from '@/components/UserAvatar';
import GlobalLogin from '@/components/GlobalSignin';
import SessionServerProvider from '@/app/(main)/session-server-provider'

interface IHeaderBarProps {
  // session: Session | null
}

const pages = [
  {
    name: 'Home',
    path: '/'
  },{
    name: 'Comedians',
    path: '/comedians'
  },{
    name: 'Specials',
    path: '/specials'
  },{
    name: 'Comedian GPTs',
    path: '/gpts'
  },{
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

export default async function HeaderBar (){
  return <AppBar className='app-bar' position="fixed">
    <Toolbar>
      <Link href="/">
        <Image
          priority={true}
          src="/logo.jpg"
          width={50}
          height={50}
          alt="Logo"
        />
      </Link>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Link key={page.path} className='link' href={page.path} >
            {page.name}
          </Link>
        ))}
      </Box>
      <Link target='_blank' href="https://github.com/FTAndy/stand-up-wiki-client-nextjs">
        <Button variant="contained" startIcon={<GitHubIcon className='github-icon'></GitHubIcon>}>
          Github
        </Button>
      </Link>
      <SessionServerProvider >
        <UserAvatar
          data-testid='user-avatar'
        />
      </SessionServerProvider>
      <GlobalLogin />
    </Toolbar>
  </AppBar>;
};
