import { create } from 'zustand'
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
}

export const useComediansStore = create<ComediansState>()((set) => ({
  page: 1,
  searchValue: '',
  comedianList: [],
  globalLoading: false,
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
    console.log(value, 'value')
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
