'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { useGPTSStore } from '../../store';

interface IChatButtonProps {
  comedianName: string
  comedianId: string
}

const ChatButton: React.FunctionComponent<IChatButtonProps> = (props) => {
  const { comedianName, comedianId } = props
  const { setCurrentChatComedianId } = useGPTSStore()

  return <Button 
    variant="contained"
    onClick={() => {
      setCurrentChatComedianId(comedianId)
    }}
  >
    Start Chat
  </Button>;
};

export default ChatButton;
