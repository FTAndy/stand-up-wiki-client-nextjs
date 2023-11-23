'use client'
import * as React from 'react';
import { useGlobalStore } from '@/store'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './index.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import useSWRMutation from 'swr/mutation'
import { specialUpVote } from '../../service/index'
import { useSession } from "next-auth/react"
import type { Session} from 'next-auth'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface IVideoInfoProps {
}

const VideoInfo: React.FunctionComponent<IVideoInfoProps> = (props) => {
  const { data: session, status } = useSession()

  const { playingSpecial, setPlayingSpecial, currentComedian, setSpecialUpVoted } = useGlobalStore()

  const { trigger, isMutating } = useSWRMutation('/api/special/upVote', specialUpVote)

  if (!playingSpecial || !session) {
    return null
  }

  return <div className='video-info-container'>
    <Typography className='video-title' gutterBottom variant="h5" component="div">
        { playingSpecial?.specialName }
    </Typography>

    <div className='thumbs'>
      <IconButton onClick={() => {
        if (playingSpecial?.isUpVoted) {
          setSpecialUpVoted(playingSpecial, false)
        } else {
          setSpecialUpVoted(playingSpecial, true)
        }
        trigger({
          userId: session.user.userId,
          specialId: playingSpecial._id,
          isUpVoted: Boolean(!playingSpecial?.isUpVoted)
        })
      }} aria-label="thumb-up" color="primary">
        { playingSpecial?.isUpVoted ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon /> }
        <span className='upVote-count'>{playingSpecial?.upVoteCount || "23"} </span>
      </IconButton>
      {/* <IconButton aria-label="thumb-down" color="primary">
        <ThumbDownOffAltIcon />
      </IconButton> */}
    </div>
  </div>;
};

export default VideoInfo;
