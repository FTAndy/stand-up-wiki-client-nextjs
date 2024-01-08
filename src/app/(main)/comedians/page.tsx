


import Search from './components/Search'
// import { kv } from '@vercel/kv';
import ComedianList from './components/ComedianList'
import styles from './page.module.scss'
import type { Metadata, ResolvingMetadata } from 'next'
import type { Comedians, Comedian } from '@/types/comdian'
import TagFilter from './components/TagFilter'
import StoreProvider from './StoreProvider'
import { getComedians } from '@/dbService/getComedians'

interface IComediansProps {
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
  const comedianList = await getComedians('0', '', '')

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

  const data = await getComedians('0', '', '')

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
