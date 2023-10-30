'use client';

import { useEffect, useState } from 'react';
import mockData from '../../service/mock'
import { Comedian } from '../../types/comdian'
import ComedianCard from '@/components/Card'
import VideoPlayer from '@/components/VideoPlayer'
import { useGlobalStore } from '@/store'
import './page.scss'

export interface Props {
}

console.log(mockData, 'mockData')

export default function Profile (props: Props) {
  const { setPlayingSpecial, currentComedian, setCurrentComedian } = useGlobalStore()

  useEffect(() => {
    setCurrentComedian((mockData[0] as any))
  }, [])

  console.log(mockData[0], 'mockData[0]')


  useEffect(() => {
    if (currentComedian) {
      setPlayingSpecial(currentComedian.specials[0])
    }
  }, [currentComedian])

  if (!currentComedian) {
    return null
  }


  return (
    <div className='profile-container'>
      {/* <div>{ comedian.name }</div> */}
      <div className='video-container'>
        <VideoPlayer
        />
      </div>
      <div className='special-container'>{ currentComedian.specials.map(s => {
        return <ComedianCard
            key={s.specialName}
            className='special'
            special={s}
          />
      }) }</div>
    </div>
  );
}