import * as React from 'react';
import type { MessageProps } from '@chatui/core';
import { Bubble } from '@chatui/core';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useGPTSStore } from '../../store'; 
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.scss'

interface IMessagePlayerProps extends MessageProps {
}

export function contentFilter(content: string) {
  return content.replaceAll(/<break time="2s" \/>/g, ' ')
}

const MessagePlayer: React.FunctionComponent<IMessagePlayerProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const audioRef = React.useRef<HTMLMediaElement>(null);
  const { content } = props;
  const { currentVoiceId, comedianChatThreads, currentChatAssistantId } = useGPTSStore()

  const currentComedianChatThread = comedianChatThreads[currentChatAssistantId]

  return <div>
    <Bubble content={contentFilter(content.text)} />
    { props.position === 'left' && props.content.text && props.content.messageId ?  
      <div className={styles['chat-playarea']}>
        <IconButton disabled={loading} onClick={async () => {
            if (audioRef.current) {
              setLoading(true)
              const source = new MediaSource();
              audioRef.current.src = URL.createObjectURL(source);
              audioRef.current.autoplay = true;
              const response = await fetch(`/api/chatThread/${currentComedianChatThread.threadId}/transformToVoice`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  message: props.content.text, 
                  messageId: props.content.messageId, 
                  voiceId: currentVoiceId
                })
              })
              const reader = response.body?.getReader()
              if (reader) {
                const sourceBuffer = source.addSourceBuffer('audio/mpeg');
            
                sourceBuffer.addEventListener('updateend', async () => {
                  const { done, value } = await reader.read();
                  if (done) {
                    source.endOfStream();
                  } else {
                    sourceBuffer.appendBuffer(value);
                  }
                });
            
                // Start the process
                const { value } = await reader.read();
                if (value) {
                  sourceBuffer.appendBuffer(value);
                }
              }
              // setLoading(false)
            }
        }} color="primary">
          <PlayCircleIcon />
        </IconButton>
        <audio ref={audioRef} style={{
              width: 'calc(100% - 3rem - 40px)',
              marginTop: '2px'
        }} id={`${props.content.messageId}_audioPlayer`} controls>
          Your browser does not support the audio element.
        </audio> 
      </div>: '' }
  </div>
};

export default MessagePlayer;
