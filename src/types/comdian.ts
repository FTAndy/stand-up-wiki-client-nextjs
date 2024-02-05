import { SourcererOutput, MovieMedia } from '@movie-web/providers';

export type Comedians = Array<Comedian>

export type Comedian = {
  _id: string
  name: string,
  desc: string,
  avatarUrl: string,
  wikiUrl?: string,
  instagramURL?: string,
  IMDBURL?: string,
  specials: Array<Special>,
  ranking?: number,
  specialSize?: number,
  AIGeneratedContent: {
    wikiDetail: string
    brief: string,
    tags: Array<string>
  },
  news?: Array<New>,
}

type New = {
  title: string,
  url: string
}

type Role = {
  name: string,
}


export type Langs = "en-US" | 'zh-CN' | 'zh-Hant' | "zh-Hans" | 'ai-zh'

export type Subtitle = {
  ai_status: number
  ai_type: number
  id: string
  id_str: string
  is_lock: boolean
  lan: Langs
  lan_doc: "英语（美国）" | "中文（简体）" | '中文（繁体）'
  subtitleASSURL: string
  type: number
}

export type Special = {
  _id: string,
  comedian_id: string
  comedianName: string,
  upVoteCount: number,
  userUpVote?: {
    isUpVoted?: boolean
  }
  noCORSVideo?: SourcererOutput['stream']
  TMDBInfo?: MovieMedia & {
    vttSubtitle?: string
  }
  specialDetail: {
    datetime: string
    netflixURL: string
    runtimeDuration: string
    tags: Array<string>
    rating: string
    presentTime: Date
    coverImgURL: string
  }
  bilibiliInfo?: BilibiliInfo
  specialName: string,
  comments: Array<CommentContent>
}

export type BilibiliInfo =  {
  aid: number,
  bvid: string,
  cid: string,
  iframeUrl: string,
  subtitles?: Array<Subtitle>
}

export type Specials = Array<Special>

type CommentContent = {
  content: string,
  author: string
}

type Tag = {
  name: string
  timestamp: string
}

type TVshow = {

}

type Movie = {

}

type Image = {
  cdnUrl: string,
  name: string
}
