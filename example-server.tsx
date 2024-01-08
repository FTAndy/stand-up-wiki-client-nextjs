'use server'
import type { Metadata, ResolvingMetadata } from 'next'

interface IPageProps {
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData<T>() {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/`)

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
  }>()

  const previousKeywords = (await parent).keywords || []

  return {
    title: '',
    keywords: [
      ...previousKeywords,
    ]
  }
}


const Page: React.FunctionComponent<IPageProps> = async (props) => {
  const {data} = await getData<{
    data: []
  }>()
  return <div></div>;
};

export default Page;
