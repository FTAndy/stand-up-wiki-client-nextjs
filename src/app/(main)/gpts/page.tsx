import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import GPTCard from '@/components/GPTCard';
import dynamicFetch from 'next/dynamic'
import Typography from '@mui/material/Typography';
import AudioPlayButton from './components/CardPlayButton'
import styles from './page.module.scss';
import ChatButton from './components/ChatButton'
import Chat from './components/Chat'
import { cache } from 'react'
import type { DigitalFigure } from '@/types/digitalFigure'
import { getComedianDigitalFigures } from '@/dbService/getComedianDigitalFigures'

const cachedGetComedianDigitalFigures = cache(getComedianDigitalFigures)

export const revalidate = 3600 * 24 * 7 // 1 week

const PlayerWithNoSSR = dynamicFetch(() => import('./components/Player'), {
  ssr: false,
})
interface IGPTSProps {
}


const GPTS: React.FunctionComponent<IGPTSProps> = async (props) => {

  const digitalFigures = await cachedGetComedianDigitalFigures()

  console.log(digitalFigures, 'digitalFigures')
  // TODO: add register limitation
  return <div className={styles['gpt-container']}>
    <Typography variant="h3" className={styles['title']} >
      Standup Comedian GPTs
    </Typography>
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      Try to chat with the comedian
    </Alert>
    <div className={styles['card-list']}>
      { digitalFigures.map(figure => {
        const { GPTInfo } = figure
        return <div className={styles['card-container']} key={figure._id}>
          <GPTCard 
            description={GPTInfo.display.description}
            name={GPTInfo.display.name}
            avatarUrl={GPTInfo.display.profile_picture_url}
            url={`https://chat.openai.com/g/${GPTInfo.display.short_url}}`}
            id={figure._id}
          />
          <div className={styles['button-area']}>
            <AudioPlayButton
              audioList={figure.jokes_audios}
            />
            <ChatButton 
              assistantId={figure.assistant_id}
              voiceId={figure.voice_id}
              comedianId={figure._id} 
              comedianName={GPTInfo.display.name} 
            />
          </div>
        </div>
      }) }
    </div>
    <PlayerWithNoSSR />
    <Chat />
  </div>;
};

export default GPTS;
