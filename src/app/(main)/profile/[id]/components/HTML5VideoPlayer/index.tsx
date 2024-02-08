'use client'
import * as React from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import type {Source, Track} from 'plyr'
import styles from './index.module.scss'
import { makeProviders, makeSimpleProxyFetcher, targets, MovieMedia } from '@movie-web/providers';
import {useDidUpdate} from '@mantine/hooks'
import Button from '@mui/material/Button';
import dynamicFetch from 'next/dynamic'
import Hls from 'hls.js'
import { fetchStream, fetchBilibiliVideoStreamService } from '../../service/index'
import CircularProgress from '@mui/material/CircularProgress';
import { PlayMode } from '@/app/(main)/store';
import './plyr.scss'

declare type Qualities = 'unknown' | '360' | '480' | '720' | '1080';

interface IHTML5VidoPlayerProps {
}

const HTML5VidoPlayer: React.FunctionComponent<IHTML5VidoPlayerProps> = (props) => {
  const { playingSpecial, currentComedian, setPlayMode } = useGlobalStore()
  const [currentTracks, setCurrentTracks] = React.useState<Track[]>([])
  const [loading, setLoading] = React.useState(false)
  const [isNoStream, setIsNoStream] = React.useState(false)
  const [retryCount, setRetryCount] = React.useState(0)

  const playerEleRef = React.useRef<HTMLVideoElement | null>(null)
  const playerRef = React.useRef<Plyr | null>(null)

  const currentPlayingSpecialId = React.useRef<string>()

  const fetchAndPlay = React.useCallback(async function() {
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
      console.log(noCORSVideo, 'noCORSVideo', playingSpecial.TMDBInfo)
      if (currentPlayingSpecialId.current !== playingSpecial.TMDBInfo.tmdbId) {
        return
      }

      let tracks: Track[] = []

      if (playingSpecial.TMDBInfo.vttSubtitle) {
        tracks = [{
          kind: 'captions',
          srcLang: 'en',
          src: `https://standup-wiki.azureedge.net${playingSpecial.TMDBInfo.vttSubtitle}`,
          label: 'English',
          default: true
        }]
        setCurrentTracks(tracks)
        // tracks.push({
        //   kind: 'captions',
        //   srcLang: 'en',
        //   src: `https://standup-wiki.azureedge.net${playingSpecial.TMDBInfo.vttSubtitle}`,
        //   label: 'English',
        //   default: true
        // })
      }

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

          // noCORSVideo.captions.forEach(c => {
          //   tracks.push({
          //     kind: 'captions',
          //     srcLang: c.language,
          //     src: c.url,
          //     label: c.language,
          //     default: c.language === 'en'
          //   })
          // })


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

          console.log(source, 'source')

          player.source = source
          player.play()
        } else if (noCORSVideo.type === 'hls') {
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = noCORSVideo.playlist;
          } else if (Hls.isSupported()) {
            // For more Hls.js options, see https://github.com/dailymotion/hls.js, https://github.com/video-dev/hls.js
            // TODO: cache more hls content
            // TODO: hls support for higher quality

            const hls = new Hls();
            hls.loadSource(noCORSVideo.playlist);
            hls.attachMedia(video);
            window.hls = hls;
            console.log('init hls', noCORSVideo.playlist, video)
            // TODO: catch error and retry if the video source is still need cors policy
            // Handle changing captions
            player.on('languagechange', () => {
              // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
              setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
            });
          }

        }
      } else if (playingSpecial.bilibiliInfo) {
        // TODO: fetch together
        // TODO: Bilibili video source subtitle
        const bilibiliReverseVideoLink = await fetchBilibiliVideoStreamService(playingSpecial.bilibiliInfo)
        if (currentPlayingSpecialId.current !== playingSpecial.TMDBInfo.tmdbId) {
          return
        }
        if (bilibiliReverseVideoLink) {
          const source = {
            type: 'video' as const,
            sources: [{
              src: bilibiliReverseVideoLink,
              type: `video/mp4`,
            }],
            tracks
          }

          console.log(source, 'source')

          player.source = source
          player.play()
        }
      }
      player.once('canplay', () => {
        setLoading(false)
      })
    }
  }
  , [playingSpecial])

  React.useEffect(() => {
    // TODO: use async import to fix 500 error
    async function init() {
      const asyncModule = await import('plyr')
      const PlyrModule = asyncModule.default
      if (playerEleRef.current) {
        playerRef.current = new PlyrModule(playerEleRef.current, {
          captions: {
            active: true,
            update: true
          }
        });
        fetchAndPlay()
      }
    }

    init()

  }, [])

  React.useEffect(() => {
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
      { currentTracks.map(t => {
          return <track key={t.src} {...t} />
        })
      }
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
