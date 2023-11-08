'use client';
import { SWRConfig } from 'swr'
import axios from 'axios'

// TODO: axios agent
export const SWRProvider = ({ children }: any) => {
  return <SWRConfig
    value={{
      revalidateOnFocus: false,
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      fetcher: (resource, init) => {
        return axios(resource, init)
        .then(res => res.data)
      }
    }}
  >{children}
  </SWRConfig>
};