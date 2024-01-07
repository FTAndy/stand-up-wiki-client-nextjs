'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { useGPTSStore } from '../../store';
import styles from './index.module.scss'

interface IChatButtonProps {
  comedianName: string
  comedianId: string
  assistantId: string,
  voiceId: string
}

const ChatButton: React.FunctionComponent<IChatButtonProps> = (props) => {
  const { comedianName, comedianId, assistantId, voiceId } = props
  const { setCurrentChatAssistantId, setOpenChat, setCurrentVoiceId } = useGPTSStore()

  return <Button 
    variant="contained"
    onClick={() => {
      setCurrentChatAssistantId(assistantId)
      setCurrentVoiceId(voiceId)
      setOpenChat(true)
    }}
  >
    Start Chat
  </Button>;
};

export default ChatButton;
