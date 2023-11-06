'use client';

import {useEffect, useState} from 'react';
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
import Typography from '@mui/material/Typography'
import './page.scss'

interface IComediansProps {
}


// TODO: SWR SSR
const Comedians: React.FunctionComponent<IComediansProps> = (props) => {

  const [comedianList, setComedianList] = useState<Array<Comedian>>([])

  const { data: initedData, error, isLoading } = useSWR<{
    comedians: Array<Comedian>
  }>('/api/comedians?page=1')

  useEffect(() => {
    if (initedData?.comedians) {
      setComedianList(initedData.comedians)
    }
  }, [initedData])

  if (!initedData || isLoading) {
    return <GlobalLoading />
  }

  console.log(comedianList, 'comedianList')

  return <div className='comedians-container'>
    <InfiniteScroll
        className='comedians-list'
        pageStart={1}
        initialLoad={false}
        loadMore={(page: number) => {
          console.log('InfiniteScroll fetch', page)
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
      { comedianList.map((comedian, index) => {
        return <Card key={`${comedian._id}_${index}`} className='card-container'>
            <img className='avatar' src={comedian.avatarImgURL} alt={comedian.name} />
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
      }) }
    </InfiniteScroll>

  </div>;
};

export default Comedians;
