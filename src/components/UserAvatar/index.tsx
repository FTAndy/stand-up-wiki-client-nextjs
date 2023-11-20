import type {Session} from 'next-auth'
import Link from 'next/link'
import Signin from '@/components/Signin'
import Image from 'next/image'
import * as React from 'react';

interface IUserAvatarProps {
  session: Session | null
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
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
      : <Signin /> 
    }
  </>;
};

export default UserAvatar;
