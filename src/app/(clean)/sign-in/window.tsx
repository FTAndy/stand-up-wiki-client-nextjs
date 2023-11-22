'use client'
import {useEffect} from 'react';
import type {Session} from 'next-auth'
import { signIn } from "next-auth/react"

interface IWindowProps {
  session: Session | null
}

// TODO: optimize to https://github.com/arye321/nextauth-google-popup-login/blob/main/pages/index.js
const Window: React.FunctionComponent<IWindowProps> = (props) => {
  const { session } = props

  useEffect(() => {
    if (!session) {
      signIn('google')
    } else {
      window.close()
    }
  }, [session])

  return '';
};

export default Window;
