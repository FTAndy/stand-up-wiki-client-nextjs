'use client'
import * as React from 'react';
import SpecialCard from '@/components/SpecialCard'
import {useGlobalStore} from '@/app/(main)/store'
import type { Specials } from '@/types/comdian'

interface ISpecialCardListProps {
}

const SpecialCardList: React.FunctionComponent<ISpecialCardListProps> = (props) => {
  const { setPlayingSpecial, playingSpecial, currentComedian, setCurrentComedian, playMode } = useGlobalStore()

  return currentComedian?.specials?.map(s => {
    return <div key={s.specialName}>
      <SpecialCard
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        special={s}
      />
    </div>
  });
};

export default SpecialCardList;
