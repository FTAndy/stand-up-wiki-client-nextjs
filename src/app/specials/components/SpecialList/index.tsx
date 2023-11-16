'use client'
import {useEffect, useState} from 'react';
import { Special } from '@/types/comdian';
import Link from 'next/link';
import SpecialCard from '@/components/SpecialCard';
import useSpecial from '../../store';
import GlobalLoading from '@/components/GlobalLoading';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

interface ISpecialListProps {
  initedSpecialList: Array<Special>
}

const SpecialList: React.FunctionComponent<ISpecialListProps> = (props) => {
  const {initedSpecialList} = props;
  const [inited, setInited] = useState(false)

  const { specialList, isGlobalLoading, searchValue, moreLoading, setMoreLoading, page, setSpecialList, setPage } = useSpecial()


  useEffect(() => {
    setInited(true)
    setSpecialList(initedSpecialList)
  }, [initedSpecialList])

  const noData = () => {
    if (!inited) {
      return false
    } else {
      return specialList.length === 0
    }
  }

  const renderSpecialsComponent = () => {
    if (noData()) {
      return <h1 style={{margin: '0 auto'}}>No Data</h1>
    } else {
      return (specialList.length ? specialList : initedSpecialList).map(s => {
        return <Link key={s._id} href={`/profile/${s.comedian_id}`}>
          <SpecialCard
            special={s}
          />
        </Link>
      })
    }
  }

  console.log(noData(), 'noData')

  return <>
    { isGlobalLoading ? <GlobalLoading /> : 
        <InfiniteScroll
          key={`infinite-scroll-${searchValue}`}
          className='specials-list'
          pageStart={1}
          initialLoad={false}
          loadMore={() => {
            if (!moreLoading) {
              setMoreLoading(true)
              axios<{data: Array<Special>}>(
                `/api/specials?page=${page}${searchValue ? `&name=${searchValue}` : ''}`
              )
              .then((res) => {
                const { data } = res.data
                if (data?.length) {
                  setSpecialList([
                    ...specialList,
                    ...data
                  ])
                }
              })
              .finally(() => {
                setMoreLoading(false)
                setPage(page + 1)
              })
            }
          }}
          hasMore={true}
          loader={moreLoading && <CircularProgress style={{alignSelf: 'center'}} />}
      >
        {renderSpecialsComponent()}
      </InfiniteScroll>
      }
  </>
};

export default SpecialList;
