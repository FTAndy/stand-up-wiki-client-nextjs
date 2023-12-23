import '@testing-library/jest-dom'
import { ElementType, Component as mockComponent } from 'react'
import { render, screen } from '@testing-library/react'
import StoreProvider from '@/app/(main)/comedians/StoreProvider'
import ComedianList from '@/app/(main)/comedians/components/ComedianList/index'
// import { Virtuoso, VirtuosoMockContext } from 'react-virtuoso'

jest.mock('react-virtuoso', () => {
  const { Virtuoso } = jest.requireActual('react-virtuoso')

  const mockVirtuoso = (WrappedVirtuoso: ElementType) =>
    class extends mockComponent<{ totalCount: number }, unknown> {
      render() {
        return <WrappedVirtuoso initialItemCount={this.props?.totalCount} {...this.props} />
      }
    }
  return { Virtuoso: mockVirtuoso(Virtuoso) }
})

const mockComedian = {
  _id: "1",
  name: "John Doe",
  desc: "A hilarious comedian",
  avatarUrl: "https://example.com/avatar.jpg",
  wikiUrl: "https://example.com/wiki",
  instagramURL: "https://example.com/instagram",
  IMDBURL: "https://example.com/imdb",
  specials: [
    {
      _id: "1",
      comedian_id: "1",
      comedianName: "John Doe",
      upVoteCount: 10,
      specialDetail: {
        datetime: "2022-01-01",
        netflixURL: "https://example.com/netflix",
        runtimeDuration: "1h 30m",
        tags: ["Comedy", "Stand-up"],
        rating: "4.5",
        presentTime: new Date(),
        coverImgURL: "https://example.com/cover.jpg",
      },
      bilibiliInfo: {
        aid: 123456,
        bvid: "BV123456",
        cid: "C123456",
        iframeUrl: "https://example.com/iframe",
      },
      specialName: "Funny Show",
      comments: [
        {
          content: "Great performance!",
          author: "Jane Smith",
        },
      ],
    },
  ],
  ranking: 1,
  specialSize: 1,
  AIGeneratedContent: {
    wikiDetail: "Lorem ipsum dolor sit amet",
    brief: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    tags: ["Comedian", "Stand-up"],
  },
  news: [
    {
      title: "New Comedy Special Announcement",
      url: "https://example.com/news",
    },
  ],
};

describe('ComedianList Component', () => {
  test('renders without crashing', () => {
    render(
        // <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 100 }}>
          <StoreProvider comedians={[
            mockComedian
          ]}>
            <ComedianList />
          </StoreProvider>
        // {/* </VirtuosoMockContext.Provider> */}
    )
    expect(screen.getByRole('virtual-list')).toBeInTheDocument()
  })

  test('renders correct number of comedian items', async () => {
    render(
        <StoreProvider comedians={[
          mockComedian
        ]}>
          <ComedianList />
        </StoreProvider>
    )

    const comedianItems = await screen.findAllByRole('card')
    expect(comedianItems).toHaveLength(1)
  })
})