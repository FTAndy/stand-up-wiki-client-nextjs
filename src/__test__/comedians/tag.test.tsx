import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TagFilter from '@/app/(main)/comedians/components/TagFilter/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StoreProvider from '@/app/(main)/comedians/StoreProvider'


describe('TagFilter Component', () => {
  test('renders without crashing', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider comedians={[]}>
          <TagFilter />
        </StoreProvider>
      </QueryClientProvider>
    )
    expect(screen.getByLabelText('Tags')).toBeInTheDocument()
  })
})