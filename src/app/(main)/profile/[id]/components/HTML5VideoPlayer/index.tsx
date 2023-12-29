'use client'
import * as React from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import Plyr, {Source, Track} from 'plyr'
import styles from './index.module.scss'
import { makeProviders, makeSimpleProxyFetcher, targets, MovieMedia } from '@movie-web/providers';
import {useDidUpdate} from '@mantine/hooks'
import Hls from 'hls.js'
import CircularProgress from '@mui/material/CircularProgress';
// import { transformSrtTracks } from 'srt-support-for-html5-videos';
import './plyr.scss'

const myFetcher = makeSimpleProxyFetcher('https://simple-proxy.ftandy.workers.dev', fetch);

const providers = makeProviders({
  fetcher: myFetcher,
  // will be played on a native video player
  target: targets.BROWSER
})

async function fetchStream (media: MovieMedia) {
  const output = await providers.runAll({
    media,
    // sourceOrder: ['flixhq']
  })

  if (!output) console.log("No stream found", media.title)
  return output?.stream
}


declare type Qualities = 'unknown' | '360' | '480' | '720' | '1080';

interface IHTML5VidoPlayerProps {
}

const HTML5VidoPlayer: React.FunctionComponent<IHTML5VidoPlayerProps> = (props) => {
  const { playingSpecial, currentComedian } = useGlobalStore()
  const [loading, setLoading] = React.useState(false)

  const playerEleRef = React.useRef<HTMLVideoElement | null>(null)
  const playerRef = React.useRef<Plyr | null>(null)

  React.useEffect(() => {
    if (playerEleRef.current) {
      playerRef.current = new Plyr(playerEleRef.current, {
        captions: {active: true}
      });
    }
  }, [])

  useDidUpdate(() => {
    async function fetchAndPlay() {
      // console.log(playerRef.current, playingSpecial, playingSpecial?.TMDBInfo, 'qqq')
      if (playerRef.current && playerEleRef.current && playingSpecial && playingSpecial.TMDBInfo) {
        const player = playerRef.current
        const video = playerEleRef.current
        // clear and fetch
        player.source = {
          type: 'video',
          sources: [],
        }
        setLoading(true)
        const stream = await fetchStream(playingSpecial.TMDBInfo)
        setLoading(false)
        const noCORSVideo = stream
        if (noCORSVideo) {
          const sources: Array<Source> = []
          if (noCORSVideo.type === 'file') {
            for (const key in noCORSVideo.qualities) {
              const qualityKey = key as Qualities;
              const source = noCORSVideo.qualities[qualityKey]
              sources.push({
                src: source?.url ?? '',
                type: `video/${source?.type}`,
                size: parseInt(qualityKey)
              })
            }
            const tracks: Array<Track> = []

            noCORSVideo.captions.forEach(c => {
              tracks.push({
                kind: 'captions',
                srcLang: c.language,
                src: c.url,
                label: c.language,
                default: c.language === 'en'
              })            
            })
            
            const source = {
              type: 'video',
              sources,
              // TODO: add poster and previewThumbnails
              // poster: '/path/to/poster.jpg',
              // previewThumbnails: {
              //   src: '/path/to/thumbnails.vtt',
              // },
              // TODO: change track to vtt
              tracks
            } as const

            console.log(source, 'source')

            player.source = source
            player.autoplay = true
            console.log(video, 'player', player)
            player.play()
          } else if (noCORSVideo.type === 'hls') {
            console.log(Hls, Hls.isSupported(), 'Hls.isSupported()')
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = noCORSVideo.playlist;
            } else if (Hls.isSupported()) {
              // For more Hls.js options, see https://github.com/dailymotion/hls.js
              const hls = new Hls();
              hls.loadSource(noCORSVideo.playlist);
              hls.attachMedia(video);
              window.hls = hls;
              console.log('init hls', noCORSVideo.playlist, video)
              
              // Handle changing captions
              // player.on('languagechange', () => {
              //   // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
              //   setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
              // });
            }

            // sources.push({
            //   src: noCORSVideo.playlist,
            //   type: 'hls'
            // })

          }
          // transformSrtTracks(playerEleRef.current)
        }
      }
    }
 
    console.log(playingSpecial, 'playingSpecial')
    fetchAndPlay()
    return () => window?.hls?.destroy();
  }, [playingSpecial?.TMDBInfo])

  const videoAttributes = {
    crossOrigin: 'true'
  }

  return <div className={styles['video-container']}>
    <video {...videoAttributes} className={styles['player-container']} ref={playerEleRef} id="player">

    </video>
    { loading && <div className={styles['cover']}>
      <CircularProgress className={styles['loading']}  />
    </div> }
  </div>;
};

export default HTML5VidoPlayer;
