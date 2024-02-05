'use client'
import * as React from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { useGPTSStore } from '../../store';
import styles from './index.module.scss'
import { useClickOutside } from '@mantine/hooks';
import MessagePlayer from '../MessagePlayer'

import {createChatThread, sendMessageToThread} from '@/service/thread'

import Button from '@mui/material/Button';

interface IChatComponentProps {
}

// TODO: switch to pro chat
const ChatComponent: React.FunctionComponent<IChatComponentProps> = (props) => {
  const [responding, setResponding] = React.useState(false);
  const { messages, appendMsg, setTyping } = useMessages([]);
  const { currentChatAssistantId, comedianChatThreads, setComedianChatThreads, openChat, setOpenChat, currentVoiceId } = useGPTSStore()
  const containerRef = useClickOutside(() => setOpenChat(false));

  const currentComedianChatThread = comedianChatThreads[currentChatAssistantId]

  React.useEffect(() => {
    setTyping(responding)
  }, [responding])

  React.useEffect(() => {
    console.log(currentComedianChatThread?.messages, 'currentComedianChatThread?.messages')
    if (currentComedianChatThread?.messages.length) {
      const lastContent = currentComedianChatThread?.messages[currentComedianChatThread?.messages.length - 1]
      appendMsg({
        type: 'text',
        content: {
          text: lastContent.content,
          messageId: lastContent.messageId
        },
      });
    }
  }, [currentComedianChatThread?.messages])

  React.useEffect(() => {
    async function fetchChatHistory() {
      appendMsg({
        type: 'text',
        content: { text: 'tell me a random joke' },
        position: 'right',
      });
      setResponding(true);
      try {
        const { threadId, answer, respondMessageId } = await createChatThread(currentChatAssistantId)
        console.log(threadId, answer, 'thread_id, answer')
        comedianChatThreads[currentChatAssistantId] = {
          threadId,
          messages: [
            {
              messageId: respondMessageId,
              content: answer
            }
          ]
        }
        setComedianChatThreads({
          ...comedianChatThreads,
        })
      } catch (error) {
        // comedianChatThreads[currentChatAssistantId] = {
        //   threadId,
        //   messages: [
        //     {
        //       content: 'network error'
        //     }
        //   ]
        // }
        // setComedianChatThreads({
        //   ...comedianChatThreads,
        // })
      }
      setResponding(false);
    }


    if (currentChatAssistantId && !currentComedianChatThread) {
      fetchChatHistory()
    }
  }, [currentChatAssistantId])

  console.log(comedianChatThreads, 'comedianChatThreads')

  return (
    <>
      <div
        ref={containerRef}
        className={styles['chat-container']}
        style={{
          display: openChat ? 'block' : 'none'
        }}
      >
        { currentChatAssistantId ?
          <Chat
            locale='en-US'
            inputOptions={{
              disabled: responding,
            }}
            placeholder={responding ? 'Responding...' : 'Type a message'}
            navbar={{ title: 'Dave Chappelle' }}
            messages={messages}
            renderMessageContent={MessagePlayer}
            onSend={async (type, val) => {
              if (type === 'text' && currentComedianChatThread && val.trim() ) {
                appendMsg({
                  type: 'text',
                  content: { text: val },
                  position: 'right',
                });

                setResponding(true);
                try {
                  const {answer, respondMessageId} = await sendMessageToThread(currentComedianChatThread.threadId, val, currentChatAssistantId)
                  console.log(answer, 'answer', respondMessageId)

                  setComedianChatThreads({
                    ...comedianChatThreads,
                    [currentChatAssistantId]: {
                      ...currentComedianChatThread,
                      messages: [
                        ...currentComedianChatThread.messages,
                        {
                          messageId: respondMessageId,
                          content: answer
                        }
                      ]
                    }
                  })
                } catch (error) {
                  console.log(error, 'error')
                }
                setResponding(false)
              }
            }}
          />
          : '' }
      </div>
    </>
  );
};

export default ChatComponent;
