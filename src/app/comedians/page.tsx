'use client';

import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { CardActionArea } from '@mui/material';
import useSWR from 'swr'
import {Comedians} from '@/types/comdian'
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
    return 'loading'
  }

  const { comedians } = data

  return <div className='comedians-container'>
    <div className='comedians-list'>
      { comedians.map(comedian => {
        return <Card className='card-container'>
          {/* <Link href='/profile' underline="none"> */}
            <img className='avatar' src={comedian.avatarImgURL} alt={comedian.name} />
            <CardContent className='card-content'>
              {comedian.AIGeneratedContent.brief}
            </CardContent>
          {/* </Link> */}
        </Card>
      }) }
    </div>
  </div>;
};

export default Comedians;
