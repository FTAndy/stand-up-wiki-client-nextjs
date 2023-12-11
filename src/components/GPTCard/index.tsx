import * as React from 'react';
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import './index.scss'

interface IGPTCardProps {
  description: string;
  avatarUrl: string;
  name: string;
  url: string;
  id: string
}


const GPTCard: React.FunctionComponent<IGPTCardProps> = (props) => {
  const {
    description,
    avatarUrl,
    name,
    url,
    id
  } = props;
  return <Link target='_blank' href={url}>
    <Card key={id} className='GPT-card-container'>
      <Image 
        src={avatarUrl}
        width={100}
        height={100}
        style={{
          'borderRadius': '50%'
        }}
        alt={name}
      />
      <CardContent className='card-content'>
        <Typography variant="subtitle1" gutterBottom>
          {name}
        </Typography>
        <Typography className='description' variant="subtitle1" gutterBottom>
          {description}
        </Typography>
        
      </CardContent>
    </Card>
  </Link>
};

export default GPTCard;
