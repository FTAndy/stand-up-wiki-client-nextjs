'use client'
import * as React from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import Plyr, {Source, Track} from 'plyr'
import styles from './index.module.scss'
import { makeProviders, makeSimpleProxyFetcher, targets, MovieMedia } from '@movie-web/providers';
import {useDidUpdate} from '@mantine/hooks'
import Button from '@mui/material/Button';
import dynamicFetch from 'next/dynamic'
import Hls from 'hls.js'
import CircularProgress from '@mui/material/CircularProgress';
import { PlayMode } from '@/app/(main)/store';
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
  const { playingSpecial, currentComedian, setPlayMode } = useGlobalStore()
  const [loading, setLoading] = React.useState(false)
  const [isNoStream, setIsNoStream] = React.useState(false)
  const [retryCount, setRetryCount] = React.useState(0)

  const playerEleRef = React.useRef<HTMLVideoElement | null>(null)
  const playerRef = React.useRef<Plyr | null>(null)

  const currentPlayingSpecialId = React.useRef<string>()

  React.useEffect(() => {
    if (playerEleRef.current) {
      playerRef.current = new Plyr(playerEleRef.current, {
        captions: {active: true}
      });
    }
  }, [])
  // TODO: avoid double fetching
  React.useEffect(() => {
    async function fetchAndPlay() {
      if (playerRef.current && playerEleRef.current && playingSpecial && playingSpecial.TMDBInfo) {
        currentPlayingSpecialId.current = playingSpecial.TMDBInfo.tmdbId

        const player = playerRef.current
        const video = playerEleRef.current
        // clear and fetch
        player.source = {
          type: 'video',
          sources: [],
        }
        player.stop()
        setLoading(true)
        setIsNoStream(false)
        const noCORSVideo = await fetchStream(playingSpecial.TMDBInfo)
        console.log(noCORSVideo, 'noCORSVideo')
        if (currentPlayingSpecialId.current !== playingSpecial.TMDBInfo.tmdbId) {
          return
        } 
        // TODO: transform subtitle format to vtt using subsrt-ts npm package and use vtt in the player, https://github.com/movie-web/movie-web/blob/48b708d5698795a96d10ddeb4f0ab9b9cd53fab0/src/components/player/utils/captions.ts
        // TODO: play srt locally https://github.com/movie-web/movie-web/blob/c347fe7ef54fa96b858e3658ec565fff77206967/src/components/player/atoms/settings/CaptionsView.tsx
        // TODO: no stream found handle
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
              // TODO: display srt on using module from movie-web
              tracks
            } as const

            player.source = source
            player.autoplay = true
            player.play()
          } else if (noCORSVideo.type === 'hls') {
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = noCORSVideo.playlist;
            } else if (Hls.isSupported()) {
              // For more Hls.js options, see https://github.com/dailymotion/hls.js
              // TODO: cache more hls content
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

          }
        } else {
          setIsNoStream(true)
        }
        player.once('canplay', () => {
          setLoading(false)
        })
      }
    }
 
    fetchAndPlay()
    return () => {
      window?.hls?.destroy();
      currentPlayingSpecialId.current = undefined
    }
  }, [playingSpecial?.TMDBInfo, retryCount])

  const videoAttributes = {
    crossOrigin: 'true' as ''
  }

  return <div className={styles['video-container']}>
    <video {...videoAttributes} className={styles['player-container']} ref={playerEleRef} id="player">

    </video>
    { isNoStream && <div className={styles['no-stream']}>
      <span className={styles['title']}>No Stream</span>
      <Button variant="contained" onClick={() => setRetryCount(retryCount + 1)}>Retry</Button>
      <span>Or</span>
      <Button variant="contained" onClick={() => setPlayMode(PlayMode.bilibili)}>Switch To Bilibili</Button>
    </div> }
    { loading && <div className={styles['cover']}>
      <CircularProgress className={styles['loading']}  />
      It might take a while to load from third party, please wait...
    </div> }
  </div>;
};

export default HTML5VidoPlayer;
