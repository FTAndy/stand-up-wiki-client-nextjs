import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from '@/app/(main)/comedians/components/Search/index'
import { http, HttpResponse } from 'msw'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StoreProvider from '@/app/(main)/comedians/StoreProvider'
import { setupServer } from 'msw/node'

const server = setupServer(
  http.get('/api/comedianNames', () => {
    return HttpResponse.json([{ name: 'George Carlin' }, { name: 'Dave Chappelle' }])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Search Component', () => {
  test('renders without crashing', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider comedians={[]}>
          <Search />
        </StoreProvider>
      </QueryClientProvider>
    )
    expect(screen.getByLabelText('Search Comedian')).toBeInTheDocument()
  })

  // test('fetches data from the correct endpoint', async () => {
  //   const queryClient = new QueryClient()
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Provider store={store}>
  //         <Search />
  //       </Provider>
  //     </QueryClientProvider>
  //   )
  //   expect(fetch).toHaveBeenCalledWith('/api/comedianNames', expect.anything())
  // })

  // test('updates search value correctly', async () => {
  //   const queryClient = new QueryClient()
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Provider store={store}>
  //         <Search />
  //       </Provider>
  //     </QueryClientProvider>
  //   )
  //   fireEvent.change(screen.getByLabelText('Search Comedian'), { target: { value: 'Dave Chappelle' } })
  //   expect(screen.getByLabelText('Search Comedian')).toHaveValue('Dave Chappelle')
  // })
})