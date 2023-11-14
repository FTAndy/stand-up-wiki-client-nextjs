


import Search from './components/Search'
import ComedianList from './components/ComedianList'
import './page.scss'
import type { Comedians, Comedian } from '@/types/comdian'

interface IComediansProps {
}

// TODO: SSR
async function getData<T>() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comedians?page=1`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const json = await res.json()

  return (json as {
    data: T
  })
}


const Comedians: React.FunctionComponent<IComediansProps> = async (props) => {

  // const {data} = await getData<Array<Comedian>>()

  // TODO: change to instant search

  return <main className='comedians-container'>
    <Search />
    <ComedianList 
      initedComedianList={[]}
    />
  </main>;
};

export default Comedians;
