'use client'

import {useEffect, useState, useMemo} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useComediansStore } from '../../store'
import GlobalLoading from '@/components/GlobalLoading'
import CircularProgress from '@mui/material/CircularProgress';
import { useDidUpdate } from '@mantine/hooks';
import Image from 'next/image'
import { Virtuoso } from 'react-virtuoso'
import type { Comedian } from '@/types/comdian'
import { getComedians } from '@/service/comedian';
import './index.scss'

interface IComedianListProps {
}

const ComedianList: React.FunctionComponent<IComedianListProps> = (props) => {

  const [moreLoading, setMoreLoading] = useState(false)

  const { setTagList, tagList, searchValue, page, setPage, comedianList, setComedianList, globalLoading, setGlobalLoading } = useComediansStore(store => store)


  useDidUpdate(() => {
    async function fetchData() {
      setGlobalLoading(true)
      const comedians = await getComedians({
        tags: tagList,
        name: searchValue
      })
      setComedianList([
        ...comedians
      ])
      setPage(1)
      setGlobalLoading(false)
    }
    fetchData()
  }, [searchValue, tagList])

  const renderComedianComponents = () => {

    if (comedianList.length === 0) {
      return <h1 style={{margin: '0 auto'}}>No Data</h1>;
    }

    return <Virtuoso
      style={{ minWidth: '50vw' }}
      useWindowScroll
      data={comedianList}
      role='virtual-list'
      endReached={async () => {
        if (!moreLoading) {
          setMoreLoading(true)
          const comedians = await getComedians({
            page,
            name: searchValue, 
            tags: tagList || []
          })
          if (comedians?.length) {
            setComedianList([
              ...(comedianList || []),
              ...comedians
            ])
          } else {
            
          }
          setMoreLoading(false)
          setPage(page + 1)
        }
      }}
      totalCount={comedianList.length}
      overscan={200}
      itemContent={(index, comedian) => {
        return <Card role='card' key={`${comedian._id}_${index}`} className='card-container'>
        { <div className='image-container'>
          {/* <Image 
            src={comedian.avatarUrl}
            // src={'https://standup-wiki.azureedge.net/images/background-1-min.webp'}
            alt={comedian.name}
            className='avatar'
            fill={true}
            style={{
              objectFit: 'cover',
            }}
          /> */}
          {/* TODO: change wiki image source to solid cdn source */}
          <CardMedia
            className='avatar'
            component="img"
            sx={{ 
              width: '100%',
              height: '100%',
            }}
            image={comedian.avatarUrl}
            alt={comedian.name}
          />
        </div> }
        <CardContent className='card-content'>
          <h1 className='name'>{comedian.name}</h1>
          <div className='brief'>
            {comedian?.AIGeneratedContent?.brief}
          </div>
          <div className='tags'>
            {comedian?.AIGeneratedContent?.tags.map(tag => {
              return <Chip 
                key={tag} 
                className='tag' 
                label={tag} 
                variant="outlined" 
                onClick={() => {
                  if (!tagList || (tagList && !tagList?.includes(tag))) {
                    setTagList([
                      ...(tagList || []),
                      tag
                    ])
                  }
                }} 
              />
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
      }}
      components={{ Footer: () => moreLoading && <CircularProgress style={{alignSelf: 'center', margin: '0 auto', display: 'block'}} /> }}
    />
  }

  return <>
    { globalLoading ? <GlobalLoading /> : renderComedianComponents()}
  </>;
};

export default ComedianList;
