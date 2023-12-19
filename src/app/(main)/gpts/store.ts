// import { createProvider } from 'next-with-zustand';
import { create } from 'zustand'
import type { Comedian } from '@/types/comdian'

export type Audio = {
  name: string
  musicSrc: string
}

export type AudioList = Array<Audio>

interface GPTSStore {
  currentAudioList: AudioList | []
  setCurrentAudioList: (audioList: AudioList) => void
}

export const useGPTSStore = create<GPTSStore>()((set) => ({
// export const { Provider, useStore: useComediansStore } = createProvider<GPTSStore>()((set) => ({
  currentAudioList: [],
  setCurrentAudioList: (audioList) => {
    set(() => {
      return {
        currentAudioList: audioList
      }
    })
  }
}))
