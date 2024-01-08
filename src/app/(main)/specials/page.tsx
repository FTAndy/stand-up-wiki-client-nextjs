import type { Special } from '@/types/comdian'
import SpecialList from './components/SpecialList';
import SearchSpecial from './components/Search';
import StoreProvider from './StoreProvider';
import type {Metadata, ResolvingMetadata} from 'next'
import { getSpeicals } from '@/dbService/getSpecials';
import styles from './page.module.scss'

export interface IAppProps {
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const specialList = await getSpeicals('0', '')

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

  const specialList = await getSpeicals('0', '')

  return <StoreProvider
    specials={specialList}
  >
    <div className={styles['specials-container']}>
      <SearchSpecial />
      <SpecialList />      
    </div>
  </StoreProvider>
}
