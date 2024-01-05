'use client'
import * as React from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { useGPTSStore } from '../../store';
import styles from './index.module.scss'

import Button from '@mui/material/Button';

interface IChatComponentProps {
}

const ChatComponent: React.FunctionComponent<IChatComponentProps> = (props) => {
  const { messages, appendMsg, setTyping } = useMessages([]);  
  const { currentChatComedianId, comedianChatThreads } = useGPTSStore()

  const currentComedianChatThread = React.useMemo(() => {
    return comedianChatThreads.find(s => s.comedianId === currentChatComedianId)
  }, [currentChatComedianId])

  React.useEffect(() => {
    async function fetchChatHistory() {
      await createChatThread(currentChatComedianId)
    }
    if (currentChatComedianId && !currentComedianChatThread) {
      fetchChatHistory()
    }
  }, [currentChatComedianId, currentComedianChatThread])

  console.log(currentChatComedianId, 'currentChatComedianId')

  return (
    <>
      <div 
        className={styles['chat-container']}
        style={currentChatComedianId ? {display: 'block'} : { display: 'none' }}
      >
        <Chat
          navbar={{ title: 'Dave Chappelle' }}
          messages={messages}
          renderMessageContent={(msg) => {
            const { content } = msg;
            return <Bubble content={content.text} />;
          }}
          onSend={(type, val) => {
            if (type === 'text' && val.trim()) {
              appendMsg({
                type: 'text',
                content: { text: val },
                position: 'right',
              });
        
              setTyping(true);
        
              setTimeout(() => {
                appendMsg({
                  type: 'text',
                  content: { text: 'Bala bala' },
                });
              }, 1000);
            }
          }}
        />      
      </div>
    </>
  );
};

export default ChatComponent;
