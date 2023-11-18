


import Search from './components/Search'
// import { kv } from '@vercel/kv';
import ComedianList from './components/ComedianList'
import './page.scss'
import type {Metadata, ResolvingMetadata} from 'next'
import type { Comedians, Comedian } from '@/types/comdian'
import TagFilter from './components/TagFilter'

interface IComediansProps {
}

async function getData<T>() {
  // server side fetch will have cache feature
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comedians?page=0`, {
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

  return <main className='comedians-container'>
    <div className='filters'>
      <Search />
      <TagFilter />
    </div>
    <ComedianList 
      initedComedianList={data}
    />
  </main>;
};

export default Comedians;
