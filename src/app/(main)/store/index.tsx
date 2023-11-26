import { create } from 'zustand'
import { createContext } from 'zustand-utils';
import { Comedian, Special } from '../../../types/comdian'

export enum SigninType {
  google = 'google',
}

interface GlobalState {
  toggleGlobalSignin: boolean
  setToggleGlobalSignin: (toggle: boolean) => void
  currentComedian: Comedian| null
  setCurrentComedian: (comedian: Comedian) => void
  playingSpecial: Special | null,
  setPlayingSpecial: (special: Special) => void
  setSpecialUpVoted: (special: Special, upVote: boolean) => void
}



export const useGlobalStore = create<GlobalState>()((set) => ({
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
        playingSpecial: special
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
