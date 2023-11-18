import axios from "axios";
import type { Comedian } from "@/types/comdian";

type getComediansProps = {
  page?: number;
  name?: string;
  tags?: Array<string>
};

export const getComedians = async (props: getComediansProps) => {
  const {name, page = 0, tags} = props
  const res = await axios<{data: Array<Comedian>}>(
    `/api/comedians?page=${page}${name ? `&name=${name}` : ''}${tags?.length ? `&tags=${tags.join(',')}` : ''}`
  )
  const data = res.data
  return data.data
}