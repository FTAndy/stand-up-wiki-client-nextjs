'use client'
import * as React from 'react';
import { useGlobalStore } from '@/store'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './index.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface IVideoInfoProps {
}

const VideoInfo: React.FunctionComponent<IVideoInfoProps> = (props) => {
  const { playingSpecial, currentComedian } = useGlobalStore()

  return <div className='video-info-container'>
    <Typography className='video-title' gutterBottom variant="h5" component="div">
        { playingSpecial?.specialName }
    </Typography>

    <div className='thumbs'>
      <IconButton aria-label="thumb-up" color="primary">
        <ThumbUpOffAltIcon />
      </IconButton>
      <IconButton aria-label="thumb-down" color="primary">
        <ThumbDownOffAltIcon />
      </IconButton>
    </div>
  </div>;
};

export default VideoInfo;
