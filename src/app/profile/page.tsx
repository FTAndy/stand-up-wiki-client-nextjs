'use client';

import { useEffect, useState } from 'react';
import { Comedian } from '../../types/comdian'
import ComedianCard from '@/components/Card'
import VideoPlayer from '@/components/VideoPlayer'
import useSWR from 'swr'
import { useGlobalStore } from '@/store'
import './page.scss'

export interface Props {
}


export default function Profile (props: Props) {

  const { setPlayingSpecial, currentComedian, setCurrentComedian } = useGlobalStore()


  const { data, error, isLoading } = useSWR('/api/comedians')

  console.log(data, 'data')
  
  // useEffect(() => {
  //   setCurrentComedian()
  // }, [])


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