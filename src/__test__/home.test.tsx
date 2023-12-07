import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/(main)/page'

describe('Home Page', () => {
  test('render', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Just Standup' })
    ).toBeDefined()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Specials For Free' })
    ).toBeDefined()
  })
  
})