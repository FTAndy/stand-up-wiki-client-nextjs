'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import { useGlobalStore } from '@/store'
import Typography from '@mui/material/Typography';
import SubtitlesOctopus from 'libass-wasm'
import { useTimer } from 'react-timer-hook';
import './index.scss'

export interface VideoPlayerProps {
  
}

// TODO: server side render https://github.com/vercel/next.js/blob/canary/examples/with-zustand/src/lib/StoreProvider.tsx
export default function VideoPlayer (props: VideoPlayerProps) {
  const { playingSpecial } = useGlobalStore()
  const [isMouseOvered, setIsMouseOvered] = useState<Boolean>(false)
  const [subtitleInited, setSubtitleInited] = useState(false)
  const [iframeInited, setIframeInited] = useState(false)

  const subtitleRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    setSubtitleInited(false)
    setIframeInited(false)
  }, [playingSpecial])

  const expiryTimestamp = useMemo(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600 * 2); // max 2 hour
    return time
  }, [iframeInited])

  const {
    totalSeconds,
    // seconds,
    // minutes,
    // hours,
    // days,
    // isRunning,
    start,
    // pause,
    // resume,
    // restart,
  } = useTimer({ 
    expiryTimestamp, 
    onExpire: () => console.warn('onExpire called') ,
    autoStart: false
  });


  useEffect(() => {
    if (subtitleRef.current) {
      subtitleRef.current.setCurrentTime(3600 * 2 - totalSeconds)
    }
  }, [totalSeconds])

  useEffect(() => {
    function mouseOverDone() {
      setIsMouseOvered(true)
    }

    if (iframeInited) {
      // Init subtitle
      var options = {
        canvas: document.getElementById('canvas'), // canvas element
        // prescaleFactor: 100,
        fonts: ['/Arial.ttf', '/TimesNewRoman.ttf'],
        subUrl: '/download.ass', // Link to subtitles
        // fonts: ['/test/font-1.ttf', '/test/font-2.ttf'], // Links to fonts (not required, default font already included in build)
        workerUrl: '/subtitles-octopus-worker.js' // Link to file "libassjs-worker.js"
      };
      subtitleRef.current = new SubtitlesOctopus(options);
      console.log(subtitleRef.current, 'instance')

      // Reset mouse over event
      setIsMouseOvered(false)
      setTimeout(() => {
        // TODO: unable to get video init event,
        iframeRef.current?.addEventListener('mouseover', mouseOverDone)
      }, 5000)

      start()
    }

    return () => {
      iframeRef.current?.removeEventListener('mouseover', mouseOverDone)
    }    
  }, [iframeInited])


  if (!playingSpecial) {
    return null
  }

  return (
    <div className='player-container'>
      <div className={`cover ${isMouseOvered && 'float'}`} />
      <iframe 
        ref={iframeRef}
        className='iframe'
        src={`${playingSpecial.bilibiliInfo.iframeUrl}&danmaku=0`}
        onLoad={() => {
          console.log('onload!!!')
          setIframeInited(true)
        }}
        allowFullScreen={true}
      />
      <canvas width='1000' height='800' className={`${isMouseOvered && 'show'} canvas`} id="canvas" />
      {/* TODO: add sidebar comment scroll */}
      {/* TODO: subtitle en/zh_cn choose */}
      {/* TODO: platform choose */}
      {/* TODO: figure mention */}
      {/* TODO: split the video content into different material script, show blow the video */}
      <Typography className='video-title' gutterBottom variant="h5" component="div">
        { playingSpecial.specialName }
      </Typography>
    </div>
  );
}
