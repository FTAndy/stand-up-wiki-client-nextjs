'use client'
import {useState, useEffect, useMemo, useCallback} from 'react';
import useSWR from 'swr'
import SpecialCard from '@/components/SpecialCard'
import GlobalLoading from '@/components/GlobalLoading'
import type { Special } from '@/types/comdian'
import TextField from '@mui/material/TextField';
import InfiniteScroll from 'react-infinite-scroller';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'
import axios from 'axios'
import debounce from 'lodash/debounce'
import './page.scss'

export interface IAppProps {
}

export default function App (props: IAppProps) {
  const [searchValue, setSearchValue] = useState('')
  const [specialList, setSpecialList] = useState<Array<Special>>([])
  const [moreLoading, setMoreLoading] = useState(false)

  // TODO: remove this
  const {data: initedSpecialList, isLoading} = useSWR<Array<Special>>(
    `/api/specials?page=1${searchValue ? `&name=${searchValue}` : ''}`
  )

  useEffect(() => {
    if (initedSpecialList?.length) {
      setSpecialList(initedSpecialList)
    } else {
      setSpecialList([])
    }
  }, [initedSpecialList])

  console.log(specialList.length, 'specialList')

  const specialsComponent = useMemo(() => {
    return specialList?.map(s => {
      return <Link key={s._id} href={`/profile/${s.comedian_id}`}>
        <SpecialCard
          special={s}
        />
      </Link>
    })
  }, [specialList])

  const debouncedOnChange = useCallback(debounce((newValue: string) => {
    console.log(newValue, 'newValue')
    if (newValue) {
      setSearchValue(newValue)
    } else {
      setSearchValue('')
    }
  }, 500), [])

  return (
    <div className='specials-container'>
      <div className='search-area'>
        <TextField
          // value={searchValue}
          onChange={(event) => {
            console.log('change', event.target.value)
            debouncedOnChange(event.target.value);
          }}
          sx={{ width: 300 }}
          label="Search Special Name"
          variant="outlined"
        />        
      </div>
      { isLoading ? <GlobalLoading /> : 
        // TODO: replace with https://github.com/ankeetmaini/react-infinite-scroll-component
        <InfiniteScroll
          key={`infinite-scroll-${searchValue}`}
          className='specials-list'
          pageStart={1}
          initialLoad={false}
          loadMore={(page: number) => {
            setMoreLoading(true)
            axios<Array<Special>>(
              `/api/specials?page=${page}${searchValue ? `&name=${searchValue}` : ''}`
            )
            .then((res) => {
              const { data } = res
              if (data?.length) {
                setSpecialList([
                  ...specialList,
                  ...data
                ])
              }
            })
            .finally(() => {
              setMoreLoading(false)
            })
          }}
          hasMore={true}
          loader={moreLoading && <CircularProgress style={{alignSelf: 'center'}} />}
      >
        {specialsComponent}
      </InfiniteScroll>
      }
    </div>
  );
}
