// import { createProvider } from 'next-with-zustand';
import { create } from 'zustand'
import type { Comedian } from '@/types/comdian'

export type Audio = {
  name: string
  musicSrc: string
}

export type ComedianChatThread = {
  comedianId: string,
  treadId: string,
  messages: {
    messageId: string,
    content: string
  }
}

export type AudioList = Array<Audio>

interface GPTSStore {
  currentAudioList: AudioList | []
  setCurrentAudioList: (audioList: AudioList) => void,
  comedianChatThreads: Array<ComedianChatThread>,
  setComedianChatThreads: (comedianChatThreads: Array<ComedianChatThread>) => void,
  currentChatComedianId: string,
  setCurrentChatComedianId: (comedianId: string) => void
}

export const useGPTSStore = create<GPTSStore>()((set) => ({
// export const { Provider, useStore: useComediansStore } = createProvider<GPTSStore>()((set) => ({
  currentAudioList: [],
  comedianChatThreads: [],
  currentChatComedianId: '',
  setCurrentChatComedianId: (comedianId) => {
    set(() => {
      return {
        currentChatComedianId: comedianId
      }
    })
  },
  setComedianChatThreads: (comedianChatThreads) => {
    set(() => {
      return {
        comedianChatThreads
      }
    })
  },
  setCurrentAudioList: (audioList) => {
    set(() => {
      return {
        currentAudioList: audioList
      }
    })
  }
}))
