'use client'
import {useEffect, useState} from 'react';
import { Special } from '@/types/comdian';
import Link from 'next/link';
import SpecialCard from '@/components/SpecialCard';
import {useSpecials} from '../../store';
import GlobalLoading from '@/components/GlobalLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Virtuoso } from 'react-virtuoso'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

interface ISpecialListProps {
}

const SpecialList: React.FunctionComponent<ISpecialListProps> = (props) => {

  const { specialList, isGlobalLoading, searchValue, moreLoading, setMoreLoading, page, setSpecialList, setPage } = useSpecials()


  const renderSpecialsComponent = () => {

    if (specialList.length === 0) {
      return <h1 style={{ margin: '0 auto' }}>No Data</h1>;
    }

    return <Virtuoso 
      className='specials-list'
      useWindowScroll
      data={specialList}
      style={{ minWidth: '50vw' }}
      overscan={200}
      itemContent={(index, s) => {
        return <div style={{ margin: '20px 0' }}>
           <Link key={s._id} href={`/profile/${s.comedian_id}`}>
            <SpecialCard special={s} />
          </Link>
        </div>
      }}
      endReached={async () => {
        if (!moreLoading) {
          setMoreLoading(true)
          axios<{data: Array<Special>}>(
            `/api/specials?page=${page}${searchValue ? `&name=${searchValue}` : ''}`
          )
          .then((res) => {
            const { data } = res.data
            if (data?.length) {
              setSpecialList([
                ...(specialList || []),
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
      components={{ Footer: () => moreLoading && <CircularProgress style={{alignSelf: 'center', margin: '0 auto', display: 'block'}} /> }}
    >

    </Virtuoso>
  }

  return <>
    { isGlobalLoading ? <GlobalLoading /> : renderSpecialsComponent() }
  </>
};

export default SpecialList;
