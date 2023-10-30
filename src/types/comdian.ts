export type Comedians = Array<Comedian>

export type Comedian = {
  name: string,
  desc: string,
  avatarImgURL: string,
  imdbURL: string,
  wikiURL: string,
  instagramURL: string,
  specials: Array<Special>,
  ranking: number,
  news: Array<New>,
}

type New = {
  title: string,
  url: string
}

type Role = {
  name: string,
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
    iframeUrl: string
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