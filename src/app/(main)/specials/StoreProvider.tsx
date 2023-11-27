'use client'
import { Provider } from "./store"
import type { Special } from '@/types/comdian'

export default function StoreProvider({
  specials,
  children, // will be a page or nested layout
}: {
    specials: Array<Special>
  children: React.ReactNode
}) {
  return (
    <Provider initialState={{
      specialList: specials,
    }}>
      {children}
    </Provider>
  )
}