'use client'
import {useEffect} from 'react';
import { useGlobalStore } from '@/store'
import VideoPlayer from './components/VideoPlayer'
import VideoInfo from './components/VideoInfo'
import TabComponent from './components/Tab'
import ComedianCard from '@/components/SpecialCard'
import type { Comedian } from '@/types/comdian'

interface IClientProps {
  comedian: Comedian
}

const Client: React.FunctionComponent<IClientProps> = (props) => {
  const { comedian } = props

  const { setPlayingSpecial, playingSpecial, currentComedian, setCurrentComedian } = useGlobalStore()

  useEffect(() => {
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

  return <div className='profile-container'>
    {/* { isLoading ? <GlobalLoading></GlobalLoading> : '' } */}
    <div className='video-container'>
      <VideoPlayer
      />
      <VideoInfo />
      <TabComponent />
    </div>
    <div className='special-container'>{ currentComedian?.specials?.map(s => {
      return <ComedianCard
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          key={s.specialName}
          className='special'
          special={s}
        />
    }) }</div>
  </div>
};

export default Client;
