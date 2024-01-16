import request from '@/service'
import type { Comedian } from "@/types/comdian";

type getComediansProps = {
  page?: number;
  name?: string;
  tags: Array<string> | null
};

export const getComedians = async (props: getComediansProps) => {
  const {name, page = 0, tags} = props
  const res = await request<{data: Array<Comedian>}>(
    `/api/comedians?page=${page}${name ? `&name=${name}` : ''}${tags?.length ? `&tags=${tags.join(',')}` : ''}`
  )
  const data = res.data
  return data.data
}