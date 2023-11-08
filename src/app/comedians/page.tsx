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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography'
import './page.scss'

interface IComediansProps {
}


// TODO: SWR SSR
const Comedians: React.FunctionComponent<IComediansProps> = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const [comedianList, setComedianList] = useState<Array<Comedian>>([])

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
                return <Chip className='tag' label={tag} variant="outlined" onClick={() => {}} />
              })}
            </div>
            <Link href={`/profile/${comedian._id}`} className='play-area'>
              <PlayCircleIcon className='play-icon'></PlayCircleIcon>
              <span>Watch All Specials For Free</span>
            </Link>
          </CardContent>
      </Card>
    }) 
  }, [comedianList])

  if (isLoading) {
    return <GlobalLoading />
  }

  console.log(comedianList, 'comedianList')

  return <div className='comedians-container'>
    <div className='search-area'>
      { comedianNamesData ? <Autocomplete
        disablePortal
        id="combo-box-demo"
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
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Comedian" />}
      /> : '' }
    </div>

    { searchValue ? 
      <div key='search-result' className='comedians-list'>
        {comedianComponents}
      </div> :
       <InfiniteScroll
          key='infinite-scroll'
          className='comedians-list'
          pageStart={1}
          initialLoad={false}
          loadMore={(page: number) => {
            console.log('loadMore!!!')
            fetch(`/api/comedians?page=${page}`)
            .then(res => {
              return res.json()
            })
            .then((res: {comedians: Array<Comedian>}) => {
              const {comedians} = res
              console.log(comedians, 'comedians', comedianList)
              if (comedians?.length) {
                setComedianList([
                  ...comedianList,
                  ...comedians
                ])
              }
            })
          }}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
      >
        { comedianComponents }
      </InfiniteScroll>
    } 
  </div>;
};

export default Comedians;
