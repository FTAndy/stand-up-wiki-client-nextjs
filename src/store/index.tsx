import { create } from 'zustand'
import { Comedian, Special } from '../types/comdian'
import { PlayerMode } from 'types/player'

interface GlobalState {
  currentComedian: Comedian| null
  setCurrentComedian: (comedian: Comedian) => void
  playingSpecial: Special | null,
  setPlayingSpecial: (special: Special) => void
  playingMode: PlayerMode | ''
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  currentComedian: null,
  playingSpecial: null,
  playingMode: '',
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
  }
}))
