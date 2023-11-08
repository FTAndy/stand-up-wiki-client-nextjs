'use client'
import * as React from 'react';
import useSWR from 'swr'
import SpecialCard from '@/components/SpecialCard'
import GlobalLoading from '@/components/GlobalLoading'
import type { Special } from '@/types/comdian'
import './page.scss'

export interface IAppProps {
}

export default function App (props: IAppProps) {
  const {data: specialsList, isLoading} = useSWR<Array<Special>>('/api/specials?page=1')

  React.useEffect(() => {

  }, [])

  if (isLoading) {
    return <GlobalLoading />
  }

  return (
    <div className='specials-container'>
      <div className='specials-list'>
        {specialsList?.map(s => {
          return <SpecialCard
            special={s}
          >

          </SpecialCard>
        })}
      </div>
    </div>
  );
}
