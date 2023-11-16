'use client'

import {useEffect, useState, useMemo} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import { useComediansStore } from '../../store'
import GlobalLoading from '@/components/GlobalLoading'
import CircularProgress from '@mui/material/CircularProgress';
import type { Comedian } from '@/types/comdian'

interface IComedianListProps {
  initedComedianList: Array<Comedian>
}

const ComedianList: React.FunctionComponent<IComedianListProps> = (props) => {
  const { initedComedianList } = props

  const [moreLoading, setMoreLoading] = useState(false)
  const [inited, setInited] = useState(false)

  const { searchValue, page, setPage, comedianList, setComedianList, globalLoading, setGlobalLoading } = useComediansStore()

  useEffect(() => {
    setComedianList(initedComedianList)
    setInited(true)
  }, [initedComedianList])

  const noData = () => {
    if (!inited) {
      return false
    } else {
      return comedianList.length === 0
    }
  }

  const renderComedianComponents = () => {
    if (noData()) {
      return <h1 style={{margin: '0 auto'}}>No Data</h1>
    } else {
      return (comedianList.length ? comedianList : initedComedianList).map((comedian, index) => {
        return <Card key={`${comedian._id}_${index}`} className='card-container'>
            <CardMedia
              className='avatar'
              component="img"
              sx={{ 
                width: '30%'
              }}
              image={comedian.avatarUrl}
              alt={comedian.name}
            />
            <CardContent className='card-content'>
              <h1 className='name'>{comedian.name}</h1>
              <div className='brief'>
                {comedian?.AIGeneratedContent?.brief}
              </div>
              <div className='tags'>
                {comedian?.AIGeneratedContent?.tags.map(tag => {
                  return <Chip key={tag} className='tag' label={tag} variant="outlined" onClick={() => {}} />
                })}
              </div>
              
              <div className='external-websites'>
                { comedian.IMDBURL ? 
                  // TODO: high resolution icon
                  <Link target='_blank' href={comedian.IMDBURL}>
                    <img src="https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png" alt="imdb" />
                  </Link>
                  :''
                }
                { comedian.wikiUrl ? 
                  // TODO: high resolution icon
                  <Link target='_blank' href={comedian.wikiUrl}>
                    <img src="https://www.wikipedia.org/static/favicon/wikipedia.ico" alt="wikipedia" />
                  </Link>
                  :''
                }
              </div>
              <Link href={`/profile/${comedian._id}`} className='play-area'>
                <PlayCircleIcon className='play-icon'></PlayCircleIcon>
                <span>Watch All {comedian.specialSize || ''} Specials For Free</span>
              </Link>
            </CardContent>
        </Card>
      }) 
    }
  }

  return <>
    { globalLoading ? <GlobalLoading /> : ''}
    { searchValue ? 
      <div key='search-result' className='comedians-list'>
        {renderComedianComponents()}
      </div> :
       <InfiniteScroll
          key={`infinite-scroll-${searchValue}`}
          className='comedians-list'
          pageStart={1}
          initialLoad={false}
          loadMore={() => {
            if (!moreLoading) {
              setMoreLoading(true)
              axios<{data: Array<Comedian>}>(`/api/comedians?page=${page}`)
              .then((res) => {
                const {data} = res.data
                if (data?.length) {
                  setComedianList([
                    ...comedianList,
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
        { renderComedianComponents() }
      </InfiniteScroll>
    }
  </>;
};

export default ComedianList;
