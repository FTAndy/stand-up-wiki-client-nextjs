import { create } from 'zustand'
import { Comedian, Special } from '../types/comdian'

interface GlobalState {
  currentComedian: Comedian| null
  setCurrentComedian: (comedian: Comedian) => void
  playingSpecial: Special | null,
  setPlayingSpecial: (special: Special) => void
}

export const useGlobalStore = create<GlobalState>()((set) => ({
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
  }
}))
