import { create } from 'zustand'
import { createContext } from 'zustand-utils';
import { Comedian, Special } from '../../../types/comdian'

export enum SigninType {
  google = 'google',
}

export enum PlayMode {
  bilibili = 'bilibili',
  html5 = 'html5'
}

interface GlobalState {
  playMode: PlayMode,
  setPlayMode: (mode: PlayMode) => void
  toggleGlobalSignin: boolean
  setToggleGlobalSignin: (toggle: boolean) => void
  currentComedian: Comedian| null
  setCurrentComedian: (comedian: Comedian | null) => void
  playingSpecial: Special | null,
  setPlayingSpecial: (special: Special | null) => void
  setSpecialUpVoted: (special: Special, upVote: boolean) => void
}



export const useGlobalStore = create<GlobalState>()((set) => ({
  playMode: PlayMode.bilibili,
  setPlayMode: (mode) => {
    set((state) => {
      return {
        playMode: mode
      }
    })
  },
  toggleGlobalSignin: false,
  setToggleGlobalSignin: (toggle) => {
    set((state) => {
      return {
        toggleGlobalSignin: toggle
      }
    })
  },
  currentComedian: null,
  playingSpecial: null,
  setCurrentComedian: (comedian) => {
    set((state) => {
      return {
        currentComedian: comedian
      }
    })
  },
  setPlayingSpecial: (special) => {
    set((state) => {
      return {
        playingSpecial: special,
        playMode: special?.TMDBInfo ? PlayMode.html5 : PlayMode.bilibili
      }
    })
  },
  setSpecialUpVoted: (playingSpecial, upVote) => {
    set((state) => {
      if (upVote) {
        return {
          playingSpecial: {
            ...playingSpecial,
            upVoteCount: playingSpecial.upVoteCount + 1,
            userUpVote: {
              ...playingSpecial.userUpVote,
              isUpVoted: true
            }
          }
        }
      } else {
        return {
          playingSpecial: {
            ...playingSpecial,
            upVoteCount: playingSpecial.upVoteCount - 1,
            userUpVote: {
              ...playingSpecial.userUpVote,
              isUpVoted: false
            }
          }
        }
      }
    })
  }
}))
