import * as React from 'react';
import type { MessageProps } from '@chatui/core';
import { Bubble } from '@chatui/core';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useGPTSStore } from '../../store'; 
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { transformToVoice, bindThreadWithMessage } from '@/service/thread'
import styles from './index.module.scss'

interface IMessagePlayerProps extends MessageProps {
}

export function contentFilter(content: string) {
  return content.replaceAll(/<break time="2s" \/>/g, ' ')
}

enum LoadingState {
  NotStart,
  Loading,
  Done
}

const MessagePlayer: React.FunctionComponent<IMessagePlayerProps> = (props) => {
  const [loadingState, setLoadingState] = React.useState<LoadingState>(LoadingState.NotStart);
  const audioRef = React.useRef<HTMLMediaElement>(null);
  const { content } = props;
  const { currentVoiceId, comedianChatThreads, currentChatAssistantId } = useGPTSStore()

  const currentComedianChatThread = comedianChatThreads[currentChatAssistantId]

  return <div>
    <Bubble content={contentFilter(content.text)} />
    { props.position === 'left' && props.content.text && props.content.messageId ?  
      <div className={styles['chat-playarea']}>
        <IconButton style={{
          display: loadingState === LoadingState.NotStart ? 'block' : 'none',
          width: '40px',
          height: '40px',
        }} onClick={async () => {
            if (audioRef.current) {
              setLoadingState(LoadingState.Loading)
              const source = new MediaSource();
              audioRef.current.src = URL.createObjectURL(source);
              audioRef.current.autoplay = true;
              // TODO: write a record to db
              const response = await transformToVoice(currentComedianChatThread.threadId, props.content.text, props.content.messageId, currentVoiceId)

              bindThreadWithMessage(currentComedianChatThread.threadId, props.content.messageId, currentVoiceId)

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
              setLoadingState(LoadingState.Done)
            }
        }} color="primary">
          <PlayCircleIcon />
        </IconButton>
        <CircularProgress style={{
          display: loadingState === LoadingState.Loading ? 'block' : 'none',
          width: '20px',
          height: '20px',
        }} />
        <CheckCircleIcon style={{
          display: loadingState === LoadingState.Done ? 'block' : 'none'
        }} />
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
