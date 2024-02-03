'use server'

import type { Metadata, ResolvingMetadata } from 'next'
import ClientComponent from './client-component'
import {getComedian} from '@/dbService/getComedian'
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

  return <ClientComponent comedian={data} />;
}
