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
import { getBaseUrl } from '@/pages/utils/publicURL'
import type { DigitalFigure } from '@/types/digitalFigure'

const PlayerWithNoSSR = dynamicFetch(() => import('./components/Player'), {
  ssr: false,
})
interface IGPTSProps {
}


async function getData<T>() {
  const res = await fetch(`${getBaseUrl()}/api/comedianDigitalFigures`, {
    next: {
      // cache data for each day
      revalidate: 60 * 60 * 24
    }
  })

  if (!res.ok) {
    console.log(res, 'res')
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()
  return (json.data as T)
}



const GPTS: React.FunctionComponent<IGPTSProps> = async (props) => {

  const digitalFigures = await getData<Array<DigitalFigure>>()

  console.log(digitalFigures, 'digitalFigures')

  return <div className={styles['gpt-container']}>
    <Typography variant="h3" className={styles['title']} >
      Standup Comedian GPTs
    </Typography>
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      All digital figures are created using material as background from special subtitles to reinforce the style of each standup comedian. Subtitles are fetched from https://www.opensubtitles.com/ API.
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
