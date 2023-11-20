'use client'
import * as React from 'react';
import './index.scss'
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"
import Button from '@mui/material/Button';

export interface ISigninProps {
}

export default function Signin (props: ISigninProps) {
  return (
    <Button onClick={() => {
      signIn('google')
    }} variant="outlined" startIcon={<GoogleIcon />} className='google-icon'>
      Sign in with Google
    </Button>
  );
}
