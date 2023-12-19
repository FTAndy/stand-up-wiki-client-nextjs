'use client'
import * as React from 'react';
import Locale from 'react-jinke-music-player/lib/config/locale'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import { useGPTSStore } from '../../store';
import 'react-jinke-music-player/assets/index.css'

interface IPlayerProps {
}

const Player: React.FunctionComponent<IPlayerProps> = (props) => {
  const {currentAudioList} = useGPTSStore()
  
  return <div> 
    <ReactJkMusicPlayer 
      defaultPosition={{
        bottom: 20,
        right: 20
      }}
      style={{
        zIndex: 10001
      }}
      autoPlay={true}
      showMediaSession
      audioLists={currentAudioList}
      locale={'en_US'}
    />,
  </div>;
};

export default Player;
