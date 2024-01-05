// import { createProvider } from 'next-with-zustand';
import { create } from 'zustand'
import type { Comedian } from '@/types/comdian'
import type { Audio, AudioList } from '@/types/audio'

export type ComedianChatThread = {
  assistantId: string,
  threadId: string,
  messages: Array<{
    messageId?: string,
    content: string
  }>
}
interface GPTSStore {
  currentAudioList: AudioList | []
  setCurrentAudioList: (audioList: AudioList) => void,
  comedianChatThreads: Array<ComedianChatThread>,
  setComedianChatThreads: (comedianChatThreads: Array<ComedianChatThread>) => void,
  currentChatAssistantId: string,
  setCurrentChatAssistantId: (assistantId: string) => void
}

export const useGPTSStore = create<GPTSStore>()((set) => ({
// export const { Provider, useStore: useComediansStore } = createProvider<GPTSStore>()((set) => ({
  currentAudioList: [],
  comedianChatThreads: [],
  currentChatAssistantId: '',
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
