import request from '@/service'
import type { BilibiliInfo } from '@/types/comdian'
import { makeProviders, makeSimpleProxyFetcher, targets, MovieMedia } from '@movie-web/providers';

const myFetcher = makeSimpleProxyFetcher('https://simple-proxy.ftandy.workers.dev', fetch);

const providers = makeProviders({
  fetcher: myFetcher,
  // will be played on a native video player
  target: targets.BROWSER
})

export function specialUpVote(data: {
  userId: string,
  specialId: string,
  isUpVoted: boolean
}) {
  return request.post('/api/special/upVote', data)
}

export async function fetchStream (media: MovieMedia) {
  const output = await providers.runAll({
    media,
    // sourceOrder: ['zoechip', 'flixhq']
  })

  console.log(output, 'output')

  if (!output) console.log("No stream found", media.title)
  return output?.stream
}

export async function getSpecialDetail(data: {
  specialId: string,
  userId: string | undefined
}) {
  const res = await request.post(`/api/specials/${data.specialId}`, data)
  return res.data.data
}

export async function fetchBilibiliVideoStreamService(bilibiliInfo: BilibiliInfo) {
  try {
    if (bilibiliInfo.cid) {
      if (bilibiliInfo.bvid) {
        return `https://bilibili-reserve.ftandy.workers.dev?bvid=${bilibiliInfo.bvid}`
      } else if (bilibiliInfo.aid) {
        return `https://bilibili-reserve.ftandy.workers.dev?avid=${bilibiliInfo.aid}`
      }
    }

    return ''
  } catch (error) {
    console.error(error)
    return ''
  }
}
