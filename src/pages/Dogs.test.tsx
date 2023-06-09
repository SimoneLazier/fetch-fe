import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Dogs from './Dogs'
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
const navigate = fn()

vi.mock('react-router', () => ({ useNavigate: () => navigate }))
vi.mock('axios', () => ({
  default: {
    get: () => ({ data: { resultIds: ['1'], total: 1 } }),
    post: (url: string) => {
      if (url === '/dogs/match') return { data: { match: '1' } }
      return { data: [mockDog] }
    },
  },
}))

describe('Dogs Page', () => {
  it('renders', async () => {
    render(<Dogs />)
    await waitFor(async () =>
      expect(await screen.findByText('Sparky')).toBeInTheDocument(),
    )
  })

  it('toggles and get results', async () => {
    render(<Dogs />)

    const card = await screen.findByText('Sparky')
    fireEvent.click(card)
    const resultsBtn = await screen.findByText('See Results')
    fireEvent.click(resultsBtn)

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/dogs/1'))
  })
})
