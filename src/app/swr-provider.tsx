'use client';
import { SWRConfig } from 'swr'
export const SWRProvider = ({ children }: any) => {
  return <SWRConfig
    value={{
      revalidateOnFocus: false,
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >{children}
  </SWRConfig>
};