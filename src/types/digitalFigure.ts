import type { AudioList } from '@/types/audio'

export type DigitalFigure = {
  assistant_id: string;
  jokes_audios: AudioList
  GPTInfo: {
    display: {
      name: string,
      description: string,
      profile_picture_url: string,
      short_url: string,
    }
  }
  voice_id: string
  _id: string

}