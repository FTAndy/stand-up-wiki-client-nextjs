


import Search from './components/Search'
// import { kv } from '@vercel/kv';
import ComedianList from './components/ComedianList'
import styles from './page.module.scss'
import type { Metadata, ResolvingMetadata } from 'next'
import type { Comedians, Comedian } from '@/types/comdian'
import TagFilter from './components/TagFilter'
import { getBaseUrl } from '@/utils/getPublicPath'
import StoreProvider from './StoreProvider'

interface IComediansProps {
}

async function getData<T>() {
  // server side fetch will have cache feature
  const res = await fetch(`${getBaseUrl()}/api/comedians?page=0`, {
    next: {
      // cache data for each day
      revalidate: 60 * 60 * 24
    }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()

  return (json as T)

}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


/**
 * Generates metadata for the stand-up comedians page.
 * 
 * @param {Props} params - The parameters for generating metadata.
 * @param {ResolvingMetadata} parent - The parent metadata.
 * @returns {Promise<Metadata>} The generated metadata.
 */
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {data: comedianList} = await getData<{
    data: Array<Comedian>
  }>()

  const previousKeywords = (await parent).keywords || []

  return {
    title: 'Standup comedians list',
    keywords: [
      ...previousKeywords,
      ...comedianList.map(s => s.name)
    ]
  }
}


const Comedians: React.FunctionComponent<IComediansProps> = async (props) => {

  const {data} = await getData<{
    data: Array<Comedian>
  }>()

  return <main className={styles['comedians-container']}>
    <StoreProvider
      comedians={data}
    >
      <div className={styles['filters']}>
        <Search />
        <TagFilter />
      </div>
      <ComedianList />
    </StoreProvider>
  </main>;
};

export default Comedians;
