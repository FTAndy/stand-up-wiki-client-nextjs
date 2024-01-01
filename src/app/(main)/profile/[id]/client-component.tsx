'use client'
import {useEffect} from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import VideoPlayer from './components/VideoPlayer'
import HTML5VidoPlayer from './components/HTML5VideoPlayer';
import VideoInfo from './components/VideoInfo'
import TabComponent from './components/Tab'
import ComedianCard from '@/components/SpecialCard'
import type { Comedian } from '@/types/comdian'
import styles from './page.module.scss'

interface IClientProps {
  comedian: Comedian
}

const Client: React.FunctionComponent<IClientProps> = (props) => {
  const { comedian } = props

  const { setPlayingSpecial, playingSpecial, currentComedian, setCurrentComedian } = useGlobalStore()

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

  return <div className={styles['profile-container']}>
    {/* { isLoading ? <GlobalLoading></GlobalLoading> : '' } */}
    <div className={styles['video-container']}>
      { playingSpecial?.TMDBInfo ? <HTML5VidoPlayer /> : <VideoPlayer/> }
      <VideoInfo />
      <TabComponent />
    </div>
    <div className={styles['special-container']}>{ currentComedian?.specials?.map(s => {
      return <ComedianCard
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          key={s.specialName}
          className={styles['special']}
          special={s}
        />
    }) }</div>
  </div>
};

export default Client;
