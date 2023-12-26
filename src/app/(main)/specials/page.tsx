import type { Special } from '@/types/comdian'
import SpecialList from './components/SpecialList';
import SearchSpecial from './components/Search';
import StoreProvider from './StoreProvider';
import type {Metadata, ResolvingMetadata} from 'next'
import styles from './page.module.scss'

export interface IAppProps {
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData<T>() {
  // server side fetch will have cache feature
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specials?page=0`, {
    next: {
      // cache data for each day
      revalidate: 60 * 60 * 24
    }
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()

  return (json as T)

}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {data: specialList} = await getData<{
    data: Array<Special>
  }>()

  const previousKeywords = (await parent).keywords || []

  return {
    title: 'Standup comedians specials list',
    keywords: [
      ...previousKeywords,
      ...specialList.map(s => s.comedianName)
    ]
  }
}


export default async function App (props: IAppProps) {

  const {data: specialList} = await getData<{
    data: Array<Special>
  }>()

  return <StoreProvider
    specials={specialList}
  >
    <div className={styles['specials-container']}>
      <SearchSpecial />
      <SpecialList />      
    </div>
  </StoreProvider>
}
