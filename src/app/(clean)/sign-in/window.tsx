'use client'
import {useEffect} from 'react';
import type {Session} from 'next-auth'
import { signIn } from "next-auth/react"

interface IWindowProps {
  session: Session | null
}

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
