'use client'
import * as React from 'react';
import { useGPTSStore, AudioList } from '../../store';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './index.scss'

interface ICardPlayButtonProps {
  audioList: AudioList
}

const CardPlayButton: React.FunctionComponent<ICardPlayButtonProps> = (props) => {
  const {setCurrentAudioList} =  useGPTSStore()

  return <Button 
    variant="contained"
    className='play-button'
    onClick={() => {
    setCurrentAudioList(props.audioList)
  }}>
    <PlayCircleIcon />
    Play Jokes with trained AI Voice!
  </Button>;
};

export default CardPlayButton;
