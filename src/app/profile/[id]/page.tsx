'use client';

import { useEffect, useState } from 'react';
import { Comedian } from '@/types/comdian'
import ComedianCard from '@/app/profile/[id]/components/Card'
import VideoPlayer from '@/app/profile/[id]/components/VideoPlayer'
import useSWR from 'swr'
import { DiscussionEmbed } from 'disqus-react';
import { useGlobalStore } from '@/store'
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
      setCurrentComedian(data.comedian)
    }
  }, [data])

  console.log(data, 'data')


  useEffect(() => {
    if (currentComedian) {
      setPlayingSpecial(currentComedian.specials[0])
    }
  }, [currentComedian])

  // TODO: add loading
  if (!currentComedian) {
    return null
  }

  return (
    <div className='profile-container'>
      {/* <div>{ comedian.name }</div> */}
      <div className='video-container'>
        <VideoPlayer
        />
        { playingSpecial && 
        <div className='discuss-secion'>
          <DiscussionEmbed
              shortname='standupwiki'
              config={
                  {
                      // url: this.props.article.url,
                      identifier: `${currentComedian._id}_${playingSpecial.specialName}`,
                      title: currentComedian.name,
                      // language: 'zh_TW' //e.g. for Traditional Chinese (Taiwan)	
                  }
              }
          />   
        </div>
        }
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