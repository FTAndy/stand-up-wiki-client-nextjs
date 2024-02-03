'use client'
import { useEffect } from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import type { Comedian } from '@/types/comdian'
import VideoPlayer from '..//BilibiliIframeVideoPlayer'
import HTML5VidoPlayer from '..//HTML5VideoPlayer';
import { PlayMode } from '@/app/(main)/store'

interface IVideoAreaProps {
  comedian: Comedian
}

const VideoArea: React.FunctionComponent<IVideoAreaProps> = (props) => {
  const { comedian } = props
  const { setPlayingSpecial, playingSpecial, currentComedian, setCurrentComedian, playMode } = useGlobalStore()

  useEffect(() => {
    console.log(comedian, 'comedian')
    if (comedian) {
      comedian.specials.sort((a, b) => new Date(b.specialDetail.presentTime).getTime() - new Date(a.specialDetail.presentTime).getTime())
      setCurrentComedian(comedian)
    }
  }, [comedian])

  useEffect(() => {
    if (currentComedian && !playingSpecial) {
      setPlayingSpecial(currentComedian.specials[0])
    }
  }, [currentComedian])

  useEffect(() => {
    return () => {
      setPlayingSpecial(null)
      setCurrentComedian(null)
    }
  }, [])

  return playingSpecial?.TMDBInfo && playMode === PlayMode.html5 ? <HTML5VidoPlayer key={'html5'} /> : <VideoPlayer key={'bilibili'} /> ;
};

export default VideoArea;
