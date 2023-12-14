'use client'
import {useEffect, useMemo} from 'react';
import { useGlobalStore } from '@/app/(main)/store'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './index.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { specialUpVote, getSpecialDetail } from '../../service/index'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from "next-auth/react"
import type {Special} from '@/types/comdian'
import type { Session} from 'next-auth'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface IVideoInfoProps {
}

const VideoInfo: React.FunctionComponent<IVideoInfoProps> = (props) => {
  const { data: session, status } = useSession()

  const { playingSpecial, setPlayingSpecial, currentComedian, setSpecialUpVoted, setToggleGlobalSignin } = useGlobalStore()

  const { mutate: triggerUpVote } = useMutation({
    mutationFn: specialUpVote
  })


  const { data: specialDetail } = useQuery<Special>({
    queryKey: ['specialDetail', playingSpecial?._id, session?.user?.userId],
    queryFn: async () => {
      if (playingSpecial) {
        return getSpecialDetail({
          specialId: playingSpecial?._id,
          userId: session?.user?.userId
        })
      }
      return null
    },
  })    

  useEffect(() => {
    if (playingSpecial && specialDetail) {
      setPlayingSpecial({
        ...playingSpecial,
        userUpVote: {
          ...(specialDetail?.userUpVote || {})
        },
        upVoteCount: specialDetail?.upVoteCount || 0
      })
    }
  }, [specialDetail])

  const isUpVoted = useMemo(() => {
    return playingSpecial?.userUpVote?.isUpVoted
  }, [playingSpecial?.userUpVote?.isUpVoted])

  if (!playingSpecial) {
    return null
  }


  return <div className='video-info-container'>
    <Typography className='video-title' gutterBottom variant="h5" component="div">
        { playingSpecial?.specialName }
    </Typography>

    <div className='thumbs'>
      <IconButton onClick={() => {
        if (session) {
          if (isUpVoted) {
            setSpecialUpVoted(playingSpecial, false)
          } else {
            setSpecialUpVoted(playingSpecial, true)
          }
          triggerUpVote({
            userId: session.user.userId,
            specialId: playingSpecial._id,
            isUpVoted: Boolean(!isUpVoted)
          })
        } else {
          setToggleGlobalSignin(true)
        }
      }} aria-label="thumb-up" color="primary">
        { isUpVoted ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon /> }
        <span className='upVote-count'>{playingSpecial.upVoteCount} </span>
      </IconButton>
      {/* <IconButton aria-label="thumb-down" color="primary">
        <ThumbDownOffAltIcon />
      </IconButton> */}
    </div>
  </div>;
};

export default VideoInfo;
