'use client'
import {useMemo} from 'react';
import { useGlobalStore } from '@/store'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './index.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { specialUpVote, getSpecialUpVotes } from '../../service/index'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from "next-auth/react"
import type { Session} from 'next-auth'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface IVideoInfoProps {
}

const VideoInfo: React.FunctionComponent<IVideoInfoProps> = (props) => {
  const { data: session, status } = useSession()

  const { playingSpecial, setPlayingSpecial, currentComedian, setSpecialUpVoted } = useGlobalStore()

  const { mutate: triggerUpVote } = useMutation({
    mutationFn: specialUpVote
  })

  const { data: specialUpVotesCount = 0 } = useQuery<number>({
    queryKey: [playingSpecial?._id],
    queryFn: () => {
      if (playingSpecial) {
        return getSpecialUpVotes({
          specialId: playingSpecial?._id
        })
      }
      return 0
    },
  })    

  const fakeSpecialUpVotesCount = useMemo(() => {
    return playingSpecial?.isUpVoted ? specialUpVotesCount + 1: specialUpVotesCount
  }, [playingSpecial?.isUpVoted, specialUpVotesCount])

  // console.log(specialUpVotesCount, fakeSpecialUpVotesCount, 'specialUpVotesCount')

  if (!playingSpecial || !session) {
    return null
  }

  return <div className='video-info-container'>
    <Typography className='video-title' gutterBottom variant="h5" component="div">
        { playingSpecial?.specialName }
    </Typography>

    <div className='thumbs'>
      <IconButton onClick={() => {

        // TODO: playing special is isUpVote field
        if (playingSpecial?.isUpVoted) {
          setSpecialUpVoted(playingSpecial, false)
        } else {
          setSpecialUpVoted(playingSpecial, true)
        }
        triggerUpVote({
          userId: session.user.userId,
          specialId: playingSpecial._id,
          isUpVoted: Boolean(!playingSpecial?.isUpVoted)
        })
      }} aria-label="thumb-up" color="primary">
        { playingSpecial?.isUpVoted ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon /> }
        <span className='upVote-count'>{fakeSpecialUpVotesCount} </span>
      </IconButton>
      {/* <IconButton aria-label="thumb-down" color="primary">
        <ThumbDownOffAltIcon />
      </IconButton> */}
    </div>
  </div>;
};

export default VideoInfo;
