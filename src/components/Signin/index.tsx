'use client'
import * as React from 'react';
import './index.scss'
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"
import Button from '@mui/material/Button';
import {useGlobalStore, SigninType} from '@/app/(main)/store';

export interface ISigninProps {
}

export default function Signin (props: ISigninProps) {
  return (
    <>
      <Button onClick={() => {
        signIn('google')
      }} variant="contained" startIcon={<GoogleIcon />}>
        Sign in with Google
      </Button>
    </>
    
  );
}
