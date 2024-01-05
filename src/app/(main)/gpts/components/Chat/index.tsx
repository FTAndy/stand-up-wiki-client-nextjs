'use client'
import * as React from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { useGPTSStore } from '../../store';
import styles from './index.module.scss'
import {createChatThread} from '@/service/thread'

import Button from '@mui/material/Button';

interface IChatComponentProps {
}

export function contentFilter(content: string) {
  return content.replaceAll(/<break time="2s" \/>/g, ' ')
}

const ChatComponent: React.FunctionComponent<IChatComponentProps> = (props) => {
  const { messages, appendMsg, setTyping } = useMessages([]);  
  const { currentChatAssistantId, comedianChatThreads, setComedianChatThreads } = useGPTSStore()

  const currentComedianChatThread = React.useMemo(() => {
    return comedianChatThreads.find(s => s.assistantId === currentChatAssistantId)
  }, [currentChatAssistantId, comedianChatThreads])

  React.useEffect(() => {
    if (currentComedianChatThread?.messages.length) {
      appendMsg({
        type: 'text',
        content: { 
          text: contentFilter(currentComedianChatThread?.messages[currentComedianChatThread?.messages.length - 1].content)
        },
      });
    }
  }, currentComedianChatThread?.messages)

  React.useEffect(() => {
    async function fetchChatHistory() {
      appendMsg({
        type: 'text',
        content: { text: 'tell me a random joke' },
        position: 'right',
      });
      setTyping(true);
      const { threadId, answer } = await createChatThread(currentChatAssistantId)
      console.log(threadId, answer, 'thread_id, answer')
      if (threadId && answer) {
        setComedianChatThreads([
          ...comedianChatThreads,
          {
            assistantId: currentChatAssistantId,
            threadId,
            messages: [
              {
                content: answer
              }
            ]
          }
        ])
        setTyping(false);
      }
    }
    

    if (currentChatAssistantId && !currentComedianChatThread) {
      fetchChatHistory()
    }
  }, [currentChatAssistantId])

  console.log(comedianChatThreads, 'comedianChatThreads')

  return (
    <>
      { currentChatAssistantId ? <div 
        className={styles['chat-container']}
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
      </div> : '' }
    </>
  );
};

export default ChatComponent;
