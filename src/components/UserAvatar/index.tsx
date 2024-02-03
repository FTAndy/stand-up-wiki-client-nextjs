'use client'
import type {Session} from 'next-auth'
import Button from '@mui/material/Button';
import { useGlobalStore } from '@/app/(main)/store';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import {signOut, useSession} from 'next-auth/react'

import './index.scss'

interface IUserAvatarProps {
  // session: Session | null
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userSignOut = () => {
    signOut()
  }

  const { setToggleGlobalSignin } = useGlobalStore()
  const avatarUrl = session?.user?.image || ''
  const alt = session?.user?.name || ''
  return <>
    { session ? <>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
        >

          <Avatar
            src={avatarUrl}
            alt={alt}
            sx={{ width: 30, height: 30 }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          >
            <MenuItem onClick={userSignOut}>
              Sign Out
            </MenuItem>
        </Menu>
        </>
      : <Button onClick={() => {
        setToggleGlobalSignin(true)
      }} variant="contained" className='login-icon'>
        Sign in
      </Button>
    }
  </>;
};

export default UserAvatar;
