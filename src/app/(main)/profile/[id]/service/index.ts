import axios from 'axios'

export function specialUpVote(url: string, { arg }: {
  arg: {
    userId: string,
    specialId: string,
    isUpVoted: boolean
  }
}) {
  return axios.post(url, arg)
}