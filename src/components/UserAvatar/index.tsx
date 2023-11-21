'use client'
import type {Session} from 'next-auth'
import Button from '@mui/material/Button';
import { useGlobalStore } from '@/store';
import * as React from 'react';
import './index.scss'

interface IUserAvatarProps {
  session: Session | null
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  const { setToggleGlobalSignin } = useGlobalStore()
  const { session } = props;

  const avatarUrl = session?.user?.image || ''
  const alt = session?.user?.name || ''
  return <>
    { session ? 
        <img 
          src={avatarUrl} 
          alt={alt} 
          width={30} height={30}
        />
        // {/* <Image
        //   // TODO: default avatar
        //   src={session?.user?.image || ''} 
        //   alt={session?.user?.name || ''} 
        //   width={30} height={30} 
        // /> */}
      : <Button onClick={() => {
        setToggleGlobalSignin(true)
      }} variant="contained" className='login-icon'>
        Sign in
      </Button>
    }
  </>;
};

export default UserAvatar;
