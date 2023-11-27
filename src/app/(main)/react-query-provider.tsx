'use client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    }
  }
})

// TODO: axios agent
export const ReactQueryProvider = ({ children }: any) => {
  return <QueryClientProvider
    client={queryClient}
  >{children}
  </QueryClientProvider>
};