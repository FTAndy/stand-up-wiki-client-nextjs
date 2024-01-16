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
  setOpenChat: (openChat: boolean) => void,
  currentVoiceId: string,
  setCurrentVoiceId: (voiceId: string) => void
}

// TODO: get computed value from store: https://github.com/chrisvander/zustand-computed
export const useGPTSStore = create<GPTSStore>()((set) => ({
// export const { Provider, useStore: useComediansStore } = createProvider<GPTSStore>()((set) => ({
  openChat: false,
  currentVoiceId: '',
  currentAudioList: [],
  comedianChatThreads: {},
  currentChatAssistantId: '',
  setCurrentVoiceId: (voiceId) => {
    set(() => {
      return {
        currentVoiceId: voiceId
      }
    })
  },
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
