import {create} from 'zustand';
import type { Special } from '@/types/comdian';

type SpecialState = {
  page: number,
  setPage: (page: number) => void,
  specialList: Array<Special> | null,
  setSpecialList: (specials: Array<Special>) => void
  searchValue: string
  setSearchValue: (value: string) => void,
  moreLoading: boolean,
  setMoreLoading: (moreLoading: boolean) => void,
  isGlobalLoading: boolean,
  setIsGlobalLoading: (isGlobalLoading: boolean) => void
};

const useSpecial = create<SpecialState>((set) => ({
  isGlobalLoading: false,
  setIsGlobalLoading: (isGlobalLoading) => {
    set(() => {
      return {
        isGlobalLoading
      };
    });
  },
  moreLoading: false,
  setMoreLoading: (moreLoading) => {
    set(() => {
      return {
        moreLoading
      };
    });
  },
  page: 1,
  setPage: (page) => {
    set((state) => {
      return {
        page
      };
    });
  },
  specialList: null,
  setSpecialList: (specials) => {
    set(() => {
      return {
        specialList: specials
      };
    });
  },
  searchValue: '',
  setSearchValue: (value) => {
    set((state) => {
      return {
        searchValue: value
      };
    });
  }
}));

export default useSpecial;
