
import type { Special } from '@/types/comdian'
import SpecialList from './components/SpecialList';
import SearchSpecial from './components/Search';
import './page.scss'

export interface IAppProps {
}

async function getData<T>() {
  // server side fetch will have cache feature
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specials?page=0`, {
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


export default async function App (props: IAppProps) {

  // TODO: remove this
  const {data: specialList} = await getData<{
    data: Array<Special>
  }>()


  return (
    <div className='specials-container'>
      <SearchSpecial />
      <SpecialList
        initedSpecialList={specialList}
      />      
    </div>
  );
}
