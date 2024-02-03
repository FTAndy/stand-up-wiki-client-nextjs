'use server'
import type { Metadata, ResolvingMetadata } from 'next'
import {getComedian} from '@/dbService/getComedian'
import VideoInfo from './components/VideoInfo'
import type { Comedian } from '@/types/comdian'
import SessionServerProvider from '@/app/(main)/session-server-provider'
import styles from './page.module.scss'
import SpecialCardList from './components/SpecialCardList';
import VideoArea from './components/VideoArea';
import './page.module.scss'

export type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const data = await getComedian(params.id)

  const previousKeywords = (await parent).keywords || []

  return {
    title: data.name,
    keywords: [
      ...previousKeywords,
      'video',
      'player'
    ]
  }
}

export default async function Profile (props: Props) {
  const { params } = props

  const data = await getComedian(params.id)

  return <div className={styles['profile-container']}>
    {/* { isLoading ? <GlobalLoading></GlobalLoading> : '' } */}
    <div className={styles['video-container']}>
      <VideoArea comedian={data} />
      <SessionServerProvider>
        <VideoInfo />
      </SessionServerProvider>
      {/* <TabComponent /> */}
    </div>
    <div className={styles['special-container']}>
      <SpecialCardList />
    </div>
  </div>
}
