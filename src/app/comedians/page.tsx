


import Search from './components/Search'
// import { kv } from '@vercel/kv';
import ComedianList from './components/ComedianList'
import './page.scss'
import type { Comedians, Comedian } from '@/types/comdian'

interface IComediansProps {
}

// TODO: SSR
async function getData<T>() {
  // const data = await kv.get('api/comedians?page=0');
  // if (!data) {

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

  // kv.set('api/comedians?page=0', json, {
  //   // 24 hour expire
  //   ex: 60 * 60 * 24
  // });

  return (json as T)
  // } else {
  //   console.log('hit cache', data)
  //   return (data as T)
  // }

}


const Comedians: React.FunctionComponent<IComediansProps> = async (props) => {

  const {data} = await getData<{
    data: Array<Comedian>
  }>()

  console.log('render')

  // TODO: change to instant search

  return <main className='comedians-container'>
    <Search />
    <ComedianList 
      initedComedianList={data}
    />
  </main>;
};

export default Comedians;
