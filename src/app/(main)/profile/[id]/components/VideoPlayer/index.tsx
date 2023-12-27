'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import Typography from '@mui/material/Typography';
import SubtitlesOctopus from 'libass-wasm'
import type {Subtitle} from '@/types/comdian'
import { Langs } from '@/types/comdian'
import Button from '@mui/material/Button';
import {useTimer} from '@/app/hooks/timer'
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import styles from './index.module.scss'

export interface VideoPlayerProps {
  
}

const FontMap = (lang: Langs) => {
  if (lang === 'en-US') {
    return ['/Arial.ttf', '/TimesNewRoman.ttf']  
  } else if (['zh-Hant'].includes(lang)) {
    return ['/zh-Hant.ttf']
  } else if (['zh-CN', 'zh-Hans' , 'ai-zh'].includes(lang)) {
    return ['/zh-Hans.ttf']
  }
}

export default function VideoPlayer (props: VideoPlayerProps) {
  const { playingSpecial, currentComedian } = useGlobalStore()
  const [isMouseOvered, setIsMouseOvered] = useState<Boolean>(false)
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle|null>(null)
  const [curMin, setCurMin] = useState(0)
  const [curSecond, setCurSecond] = useState(0)
  const [iframeInited, setIframeInited] = useState(false)
  const [subTitleInited, setSubTitleInited] = useState(false)

  const subtitleRef = useRef<any>(null)
  const iframeContainerRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    setIframeInited(false)
    setSubTitleInited(false)
  }, [playingSpecial])

  const {
    seconds: totalSeconds,
    setSeconds,
    reset,
  } = useTimer({ 
    initiallyRunning: false,
    initialSeconds: 0
  });


  useEffect(() => {
    if (subtitleRef.current && currentSubtitle) {
      subtitleRef.current.setCurrentTime(totalSeconds)
    }
  }, [totalSeconds])


  useEffect(() => {
    if (currentSubtitle) {
      console.log(currentSubtitle?.lan, FontMap(currentSubtitle?.lan), 'lang')

      // Init subtitle
      var options = {
        canvas: document.getElementById('canvas'), // canvas element
        // prescaleFactor: 100,
        fonts: FontMap(currentSubtitle?.lan || 'en-US'),
        subUrl: currentSubtitle?.subtitleASSURL?.replace('https://andycdn-fndbfaewgxbve2ha.z01.azurefd.net', 'https://standup-wiki.azureedge.net'), // Link to subtitles
        // fonts: ['/test/font-1.ttf', '/test/font-2.ttf'], // Links to fonts (not required, default font already included in build)
        workerUrl: '/subtitles-octopus-worker.js' // Link to file "libassjs-worker.js"
      };
      subtitleRef.current = new SubtitlesOctopus(options);

      
      if (!subTitleInited) {
        setSubTitleInited(true)
        reset()
      }

      console.log('subtitle init')
    } else {
      // destory subtitle
      if (subtitleRef.current) {
        subtitleRef.current?.dispose()
      }
    }
  }, [currentSubtitle])

  useEffect(() => {
    function mouseOverDone() {
      setIsMouseOvered(true)
    }

    function mouseLeaveDone() {
      setIsMouseOvered(false)
    }

    if (iframeInited) {
      // Reset mouse over event
      setIsMouseOvered(false)

      setTimeout(() => {
        // TODO: unable to get video init event,
        // TODO: hover 5s to mouseleave
        iframeContainerRef.current?.addEventListener('mouseover', mouseOverDone)
        iframeContainerRef.current?.addEventListener('mouseleave', mouseLeaveDone)
      }, 3000)

      if (playingSpecial?.bilibiliInfo?.subtitles?.length) {
        setCurrentSubtitle(playingSpecial?.bilibiliInfo.subtitles[0])
      } else {
        setCurrentSubtitle(null)
      }

      console.log('iframe event inited')
    }

    return () => {
      iframeContainerRef.current?.removeEventListener('mouseover', mouseOverDone)
      iframeContainerRef.current?.removeEventListener('mouseleave', mouseLeaveDone)
    }    
  }, [iframeInited])


  return (
    <div className={styles['player-container']}>
      <div ref={iframeContainerRef} className={styles['iframe-container']}>
        <div className={styles['slot']}></div>
        {playingSpecial ? 
          <>
            <iframe 
              className={styles['iframe']}
              src={`${playingSpecial?.bilibiliInfo?.iframeUrl}&danmaku=0`}
              onLoad={() => {
                console.log('onload!!!')
                setIframeInited(true)
              }}
              allowFullScreen={true}
            />
            <canvas width='1000' height='800' className={`${(isMouseOvered || !currentSubtitle) && styles['hide']} ${styles['canvas']}`} id="canvas" />
            {/* TODO: add sidebar comment scroll */}
            {/* TODO: platform choose */}
            {/* TODO: figure mention */}
            {/* TODO: split the video content into different material script, show blow the video */}
          </>
         : ''}
      </div>
      { currentSubtitle && playingSpecial ? <div key={playingSpecial?._id} className={styles['subtitle-container']}>
        <ClosedCaptionIcon className={styles['cc-icon']} />
        <ButtonGroup className={styles['subtitles']} aria-label="large primary button group">
          {playingSpecial?.bilibiliInfo?.subtitles?.map(subtitle => {
            return <Button 
              className={styles['sustitle-button']}
              key={subtitle.lan}
              variant={currentSubtitle?.lan === subtitle.lan ? "contained" : 'outlined'}
              onClick={() => {
                if (currentSubtitle?.lan !== subtitle.lan) {
                  setCurrentSubtitle(subtitle)
                }
              }}
            >
              {subtitle.lan}
            </Button>
          })}
        </ButtonGroup>
        <div className={styles['jump-to']}>
          <TextField 
            className={styles['minute']}
            id="outlined-basic" 
            inputProps={{
              type: 'number',
              min: "0",
              max: "300",
              defaultValue: '0'
            }} 
            onChange={(e) => {
              setCurMin(parseInt(e.target.value))
            }}
            label="Minute" 
            variant="outlined" 
          />
          <TextField
            className={styles['second']}
            inputProps={{
              type: 'number',
              min: "0",
              max: "59",
              defaultValue: '0'
            }}
            onChange={(e) => {
              setCurSecond(parseInt(e.target.value))
            }}
            id="outlined-basic" label="Second" variant="outlined" />
          <Button 
            className={styles['jump-to-button']}
            size='large'
            variant={"contained" }
            onClick={() => {
              const sumSecond = curMin * 60 + curSecond
              console.log(curMin, curSecond, sumSecond)
              if (sumSecond > 0) {
                setSeconds(sumSecond)
              } else {

              }
            }}
          >Subtitle Jump To</Button>
        </div>
      </div> : '' }

    </div>
  );
}
