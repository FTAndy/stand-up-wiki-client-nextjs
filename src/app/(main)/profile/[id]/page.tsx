'use server'

import { Comedian } from '@/types/comdian'
import type { Metadata, ResolvingMetadata } from 'next'
import ClientComponent from './client-component'
import './page.module.scss'

export type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData<T>(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comedians/${id}`, {
    next: {
      // cache data for each day
      revalidate: 60 * 60 * 24
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()
  return (json as T)
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {data} = await getData<{
    data: []
  }>(params.id)

  const previousKeywords = (await parent).keywords || []

  return {
    title: '',
    keywords: [
      ...previousKeywords,
    ]
  }
}

export default async function Profile (props: Props) {
  const { params } = props

  const {data} = await getData<{
    data: Comedian
  }>(params.id)

  return <ClientComponent comedian={data} />;
}
