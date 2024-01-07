// import { createProvider } from 'next-with-zustand';
import { create } from 'zustand'
import type { Comedian } from '@/types/comdian'
import type { Audio, AudioList } from '@/types/audio'

export type ComedianChatThreads = {
  [assistantId: string]: {
    threadId: string,
    messages: Array<{
      messageId?: string,
      content: string
    }>
  }
}

export type ComedianChatThread = ComedianChatThreads[keyof ComedianChatThreads]

interface GPTSStore {
  currentAudioList: AudioList | []
  setCurrentAudioList: (audioList: AudioList) => void,
  comedianChatThreads: ComedianChatThreads,
  setComedianChatThreads: (comedianChatThreads: ComedianChatThreads) => void,
  currentChatAssistantId: string,
  setCurrentChatAssistantId: (assistantId: string) => void
  openChat: boolean,
  setOpenChat: (openChat: boolean) => void
}

export const useGPTSStore = create<GPTSStore>()((set) => ({
// export const { Provider, useStore: useComediansStore } = createProvider<GPTSStore>()((set) => ({
  openChat: false,
  currentAudioList: [],
  comedianChatThreads: {},
  currentChatAssistantId: '',
  setOpenChat: (openChat) => {
    set(() => {
      return {
        openChat
      }
    })
  },
  setCurrentChatAssistantId: (assistantId) => {
    set(() => {
      return {
        currentChatAssistantId: assistantId
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
