import { createProvider } from 'next-with-zustand';
import type { Comedian } from '@/types/comdian'

interface ComediansState {
  page: number,
  searchValue: string
  setPage: (page: number) => void,
  setSearchValue: (value: string) => void,
  comedianList: Array<Comedian>,
  globalLoading: boolean,
  setGlobalLoading: (globalLoading: boolean) => void
  setComedianList: (comedians: Array<Comedian>) => void
  tagList: Array<string> | null
  setTagList: (tagList: Array<string>) => void
}

// export const useComediansStore = create<ComediansState>()((set) => ({
export const { Provider, useStore: useComediansStore } = createProvider<ComediansState>()((set) => ({
  page: 1,
  searchValue: '',
  comedianList: [],
  globalLoading: false,
  tagList: null,
  setTagList: (tagList) => {
    set(() => {
      return {
        tagList
      }
    })
  },
  setGlobalLoading: (globalLoading) => {
    set(() => {
      return {
        globalLoading
      }
    })
  },
  setComedianList: (comedians) => {
    set(() => {
      return {
        comedianList: comedians
      }
    })
  },
  setSearchValue: (value) => {
    set((state) => {
      return {
        searchValue: value,
      }
    })
  },
  setPage: (page) => {
    set((state) => {
      return {
        page
      }
    })
  }
}))
