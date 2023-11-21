'use client'
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useGlobalStore } from '@/store';
import Signin from '../Signin';
import NewWindow from 'react-new-window';
import './index.scss'

interface IGlobalSigninProps {
}

const GlobalSignin: React.FunctionComponent<IGlobalSigninProps> = (props) => {
  const { toggleGlobalSignin, setToggleGlobalSignin } = useGlobalStore()

  const handleClose = () => {
    setToggleGlobalSignin(false)
  };


  return <Dialog className='sign-in-container' onClose={handleClose} open={toggleGlobalSignin}>
    <DialogTitle>Sign In</DialogTitle>
    <Signin />
  </Dialog>
};

export default GlobalSignin;
