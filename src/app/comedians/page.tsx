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
import Chip from '@mui/material/Chip';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {Comedians} from '@/types/comdian'
import GlobalLoading from '@/components/GlobalLoading'
import Typography from '@mui/material/Typography'
import './page.scss'

interface IComediansProps {
}


// TODO: SWR SSR
const Comedians: React.FunctionComponent<IComediansProps> = (props) => {

  const { data, error, isLoading } = useSWR<{
    comedians: Comedians
  }>('/api/comedians')

  if (!data || isLoading) {
    return <GlobalLoading />
  }

  const { comedians } = data

  return <div className='comedians-container'>
    <div className='comedians-list'>
      { comedians.map(comedian => {
        return <Card className='card-container'>
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
    </div>
  </div>;
};

export default Comedians;
