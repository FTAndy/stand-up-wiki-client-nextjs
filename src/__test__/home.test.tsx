import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(main)/page'
import HeaderBar from '@/components/HeaderBar'

jest.mock('@/service/mongo-client', () => ({
  getMongoDbClient: jest.fn().mockResolvedValue({
    db: () => ({
      collection: () => ({
        find: () => ({
          toArray: () => Promise.resolve([
            { _id: 1, name: 'George Carlin' },
            { _id: 2, name: 'Dave Chappelle' },
            { _id: 3, name: 'Louis C.K.' },
            { _id: 4, name: 'Bill Burr' },
            { _id: 5, name: 'Richard Pryor' },
          ]),
        }),
      }),
    }),
  }),
}));

// Jest does not have a global describe function, so we don't need to import it.
describe('Home Page', () => {
  test('content', async () => {
    render(await Home())
    expect(
      screen.getByRole('heading', { level: 1, name: 'Just Standup' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Specials For Free' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Picture of great comedians'})
    ).toBeInTheDocument()
  })

  test('header', () => {
    render(<HeaderBar session={null} />)
    
    expect(
      screen.getByRole('img', { name: 'Logo'})
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('link', {
        name: /Home|Comedians|Specials|About/
      })
    ).toHaveLength(4)

    const githubButton = screen.getByText('Github');
    expect(githubButton).toBeInTheDocument();
  })

  test('renders image with correct src', async () => {
    render(await Home())
    const image = screen.getByRole('img', { name: 'Picture of great comedians' })
    expect(image).toHaveAttribute('src', expect.stringContaining('comedians-4x-min'))
  })

  test('renders comedians in the correct order', async () => {

    render(await Home())
    await screen.findByRole('img', { name: 'Picture of great comedians' })

    const comedians = screen.getAllByRole('link')
    expect(comedians[0]).toHaveAttribute('href', '/profile/1')
    expect(comedians[1]).toHaveAttribute('href', '/profile/2')
    expect(comedians[2]).toHaveAttribute('href', '/profile/3')
    expect(comedians[3]).toHaveAttribute('href', '/profile/4')
    expect(comedians[4]).toHaveAttribute('href', '/profile/5')
  })
})