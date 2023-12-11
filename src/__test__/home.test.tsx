import { expect, test, describe } from 'vitest'
import { render, screen,  } from '@testing-library/react'
import Home from '@/app/(main)/page'
import HeaderBar from '@/components/HeaderBar'

describe('Home Page', () => {
  test('content', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Just Standup' })
    ).toBeDefined()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Specials For Free' })
    ).toBeDefined()
    expect(
      screen.getByRole('img', { name: 'Picture of great comedians'})
    )
    .toBeDefined()
  })

  test('header', () => {
    render(<HeaderBar session={null} />)
    
    expect(
      screen.getByRole('img', { name: 'Logo'})
    )
    .toBeDefined()

    expect(
      screen.getAllByRole('link', {
        name: /Home|Comedians|Specials|About/
      })
    )

    const githubButton = screen.getByText('Github');
    expect(githubButton).toBeDefined();
  })
})

