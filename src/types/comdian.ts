export type Comedians = Array<Comedian>

export type Comedian = {
  _id: string
  name: string,
  desc: string,
  avatarImgURL: string,
  imdbURL: string,
  wikiURL: string,
  instagramURL: string,
  specials: Array<Special>,
  ranking: number,
  AIGeneratedContent: {
    wikiDetail: string
    brief: string,
    tags: Array<string>
  },
  news: Array<New>,
}

type New = {
  title: string,
  url: string
}

type Role = {
  name: string,
}

export enum Langs {
  "enUS" = "en-US",
  "zhs" = "zh-Hans",
  "zht" = "zh-Hant"
}

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
  specialDetail: {
    datetime: string
    netflixURL: string
    runtimeDuration: string
    tags: Array<string>
    rating: string
    coverImgURL: string
  }
  bilibiliInfo: {
    aid: number,
    bvid: string,
    cid: string,
    iframeUrl: string,
    subtitles: Array<Subtitle>
  }
  specialName: string,
  comments: Array<CommentContent>
}

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