'use client'
import * as React from 'react';
import Locale from 'react-jinke-music-player/lib/config/locale'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import { useGPTSStore } from '../../store';
import 'react-jinke-music-player/assets/index.css'

interface IPlayerProps {
}

const Player: React.FunctionComponent<IPlayerProps> = (props) => {
  const musicPlayerRef = React.useRef(null)

  const {currentAudioList} = useGPTSStore()
  
  React.useEffect(() => {
    if (currentAudioList.length && musicPlayerRef.current) {
      (musicPlayerRef.current as { play: () => void }).play()
    }
  }, [currentAudioList])

  return <div> 
    <ReactJkMusicPlayer 

      ref={musicPlayerRef}
      mode='full'
      defaultPosition={{
        bottom: 20,
        right: 20
      }}
      style={{
        display: currentAudioList.length ? 'block' : 'none',
        zIndex: 10001
      }}
      showMediaSession
      audioLists={currentAudioList}
      locale={'en_US'}
    />,
  </div>;
};

export default Player;
