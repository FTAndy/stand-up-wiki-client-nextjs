'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { useGPTSStore } from '../../store';
import styles from './index.module.scss'

interface IChatButtonProps {
  comedianName: string
  comedianId: string
  assistantId: string
}

const ChatButton: React.FunctionComponent<IChatButtonProps> = (props) => {
  const { comedianName, comedianId, assistantId } = props
  const { setCurrentChatAssistantId } = useGPTSStore()

  return <Button 
    variant="contained"
    onClick={() => {
      setCurrentChatAssistantId(assistantId)
    }}
  >
    Start Chat
  </Button>;
};

export default ChatButton;
