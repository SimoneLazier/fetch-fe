import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { fn } from '@vitest/spy'
import { vi } from 'vitest'
import LocationSelector from './LocationSelector'
import { LocationFilters } from '../api/locations'

// Mock ResizeObserver
const MockResizeObserver = fn(() => ({
  disconnect: fn(),
  observe: fn(),
  unobserve: fn(),
}))
vi.stubGlobal('ResizeObserver', MockResizeObserver)

// Mock map and location
vi.mock('./Map.tsx', () => ({
  default: ({ onSelect }: { onSelect: (rect: unknown) => void }) => {
    return (
      <button
        onClick={() => onSelect({ top: 1, bottom: 0, left: 0, right: 1 })}
      >
        Mocked Map
      </button>
    )
  },
}))
vi.mock('../api/locations.ts', () => ({
  default: {
    search: async (filters: LocationFilters) => {
      if (filters.city === 'Chicago')
        return { results: [{ zip_code: '123' }], total: 1 }
      if (filters.states[0] === 'IL')
        return { results: [{ zip_code: '456' }], total: 1 }
      if (filters.boundingBox?.top === 1)
        return { results: [{ zip_code: '789' }], total: 1 }
      if (filters.city === 'Madison') return { results: [], total: 1000 }
      return null
    },
  },
}))

describe('Location Selector', () => {
  it('returns null if no filter is present', async () => {
    const onChange = fn()
    render(<LocationSelector onChange={onChange} />)

    // Open modal
    const button = await screen.findByRole('button')
    fireEvent.click(button)

    // Confirm
    const confirm = await screen.findByText('Confirm')
    fireEvent.click(confirm)

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(null))
  })

  it('selects a city', async () => {
    const onChange = fn()
    render(<LocationSelector onChange={onChange} />)

    // Open modal
    const button = await screen.findByRole('button')
    fireEvent.click(button)

    // Input city
    const cityInput = await screen.findByPlaceholderText('Chicago')
    fireEvent.change(cityInput, { target: { value: 'Chicago' } })

    // Confirm
    const confirm = await screen.findByText('Confirm')
    fireEvent.click(confirm)

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(['123']))
  })

  it('selects a state', async () => {
    const onChange = fn()
    render(<LocationSelector onChange={onChange} />)

    // Open modal
    const button = await screen.findByRole('button')
    fireEvent.click(button)

    // Input state
    const selectInput = await screen.findByPlaceholderText(
      'Illinois, California, ...',
    )
    fireEvent.change(selectInput, { target: { value: 'Illinois' } })

    // Select option
    const illinoisButton = await screen.findByText('Illinois')
    fireEvent.click(illinoisButton)

    // Confirm
    const confirm = await screen.findByText('Confirm')
    fireEvent.click(confirm)

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(['456']))
  })

  it('selects a geo bounding box', async () => {
    const onChange = fn()
    render(<LocationSelector onChange={onChange} />)

    // Open modal
    const button = await screen.findByRole('button')
    fireEvent.click(button)

    // Click buttons that mocks the google map
    const mockedMap = await screen.findByText('Mocked Map')
    fireEvent.click(mockedMap)

    // Confirm
    const confirm = await screen.findByText('Confirm')
    fireEvent.click(confirm)

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(['789']))
  })

  it('displays an error if there are too many results', async () => {
    const onChange = fn()
    render(<LocationSelector onChange={onChange} />)

    // Open modal
    const button = await screen.findByRole('button')
    fireEvent.click(button)

    // Input city with too many zip codes
    const cityInput = await screen.findByPlaceholderText('Chicago')
    fireEvent.change(cityInput, { target: { value: 'Madison' } })

    // Confirm
    const confirm = await screen.findByText('Confirm')
    fireEvent.click(confirm)

    await waitFor(async () =>
      expect(
        await screen.findByText(
          'The selected area is too large, please narrow your research!',
        ),
      ).toBeInTheDocument(),
    )
  })
})
