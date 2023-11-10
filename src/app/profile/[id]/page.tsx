'use client';

import { useEffect, useState } from 'react';
import { Comedian } from '@/types/comdian'
import ComedianCard from '@/components/SpecialCard'
import VideoPlayer from '@/app/profile/[id]/components/VideoPlayer'
import useSWR from 'swr'
import TabComponent from './components/Tab'
import { useGlobalStore } from '@/store'
import GlobalLoading from '@/components/GlobalLoading'
import './page.scss'

export interface Props {
  params: { id: string }
}


export default function Profile (props: Props) {
  const {params} = props
  const {id} = params
  const { setPlayingSpecial, playingSpecial, currentComedian, setCurrentComedian } = useGlobalStore()


  const { data, error, isLoading } = useSWR<{
    comedian: Comedian
  }>(`/api/comedian/${id}`)

  useEffect(() => {
    if (data) {
      data.comedian.specials.sort((a, b) => new Date(b.specialDetail.presentTime).getTime() - new Date(a.specialDetail.presentTime).getTime())
      setCurrentComedian(data.comedian)
    }
  }, [data])

  useEffect(() => {
    if (currentComedian && !playingSpecial) {
      setPlayingSpecial(currentComedian.specials[0])
    }
  }, [currentComedian])

  // TODO: add loading
  // if (!currentComedian) {
  //   return null
  // }

  return (
    <div className='profile-container'>
      {/* <div>{ comedian.name }</div> */}
      { isLoading ? <GlobalLoading></GlobalLoading> : '' }
      <div className='video-container'>
        <VideoPlayer
        />
        <TabComponent></TabComponent>
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
  );
}