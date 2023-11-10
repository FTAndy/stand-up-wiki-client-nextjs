'use client';

import {useEffect, useMemo, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { CardActionArea } from '@mui/material';
import useSWR from 'swr'
import InfiniteScroll from 'react-infinite-scroller';
import Chip from '@mui/material/Chip';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import type {Comedian} from '@/types/comdian'
import GlobalLoading from '@/components/GlobalLoading'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import './page.scss'

interface IComediansProps {
}


// TODO: SWR SSR
const Comedians: React.FunctionComponent<IComediansProps> = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const [comedianList, setComedianList] = useState<Array<Comedian>>([])
  const [moreLoading, setMoreLoading] = useState(false)
  const [page, setPage] = useState(1)

  const { data: initedComedianData, error, isLoading } = useSWR<{
    comedians: Array<Comedian>
  }>(`/api/comedians?page=1&name=${searchValue}`)

  const { data: comedianNamesData } = useSWR<Array<Pick<Comedian, 'name'>>>('/api/comedianNames')



  useEffect(() => {
    if (initedComedianData?.comedians) {
      setComedianList(initedComedianData.comedians)
    }
  }, [initedComedianData])

  const comedianComponents = useMemo(() => {
    return  comedianList.map((comedian, index) => {
      return <Card key={`${comedian._id}_${index}`} className='card-container'>
          <CardMedia
            className='avatar'
            component="img"
            sx={{ width: 200 }}
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
  }, [comedianList])

  // TODO: change to instant search

  return <div className='comedians-container'>
    <div className='search-area'>
      { comedianNamesData ? <Autocomplete
        disablePortal
        options={comedianNamesData?.map(s => {
          return {
            label: s.name,
          }
        })}
        value={{
          label: searchValue
        }}
        onChange={(event, newValue) => {
          console.log(newValue, 'newValue')
          if (newValue) {
            setSearchValue(newValue.label)
          } else {
            setSearchValue('')
          }
          setPage(1)
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Comedian" />}
      /> : '' }
    </div>
    
    { isLoading ? <GlobalLoading /> : ''}

    { searchValue ? 
      <div key='search-result' className='comedians-list'>
        {comedianComponents}
      </div> :
       <InfiniteScroll
          key={`infinite-scroll-${searchValue}`}
          className='comedians-list'
          pageStart={1}
          initialLoad={false}
          loadMore={() => {
            if (!moreLoading) {
              setMoreLoading(true)
              axios<{comedians: Array<Comedian>}>(`/api/comedians?page=${page + 1}`)
              .then((res) => {
                const {comedians} = res.data
                if (comedians?.length) {
                  setComedianList([
                    ...comedianList,
                    ...comedians
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
        { comedianComponents }
      </InfiniteScroll>
    } 
  </div>;
};

export default Comedians;
