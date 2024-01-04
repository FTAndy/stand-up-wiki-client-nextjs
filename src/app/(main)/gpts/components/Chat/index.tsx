'use client'
import * as React from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import styles from './index.module.scss'

interface IChatComponentProps {
}

const ChatComponent: React.FunctionComponent<IChatComponentProps> = (props) => {
  const { messages, appendMsg, setTyping } = useMessages([]);

  return (
    <div className={styles['chat-container']}>
      <Chat
        className={styles['chat-element']}
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
  );
};

export default ChatComponent;
