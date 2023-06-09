import { render, screen, waitFor } from '@testing-library/react'
import Dog from './Dog'
import { vi } from 'vitest'
import { fn } from '@vitest/spy'

const mockDog: Dog = {
  id: '1',
  age: 1,
  breed: 'Golden Retriever',
  name: 'Sparky',
  img: '',
  zip_code: '60607',
}

vi.mock('react-router', () => ({ useParams: () => ({ id: 1 }) }))
vi.mock('react-router-dom', () => ({ Link: () => <></> }))
vi.mock('axios', () => ({ default: { post: () => ({ data: [mockDog] }) } }))
vi.mock('canvas-confetti', () => ({ default: { create: () => fn() } }))

describe('Dog Page', () => {
  it('renders', async () => {
    render(<Dog />)
    await waitFor(async () =>
      expect(await screen.findByText('Sparky')).toBeInTheDocument(),
    )
  })
})
