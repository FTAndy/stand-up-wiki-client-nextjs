'use client'
import * as React from 'react';
import { useGPTSStore, AudioList } from '../../store';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from './index.module.scss'

interface ICardPlayButtonProps {
  audioList: AudioList
}

const CardPlayButton: React.FunctionComponent<ICardPlayButtonProps> = (props) => {
  const {setCurrentAudioList} =  useGPTSStore()

  return <Button 
    variant="contained"
    className={styles['play-button']}
    onClick={() => {
    setCurrentAudioList(props.audioList)
  }}>
    <PlayCircleIcon />
    Play Jokes
  </Button>;
};

export default CardPlayButton;
