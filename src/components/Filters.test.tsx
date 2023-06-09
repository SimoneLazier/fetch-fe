import { act, fireEvent, render, screen } from '@testing-library/react'
import Filters from './Filters'
import { DogFilters } from '../api/dogs'
import { vi } from 'vitest'
import { fn } from '@vitest/spy'

// Mock breed APIs and location
vi.mock('./LocationSelector.tsx', () => ({
  default: ({ onChange }: { onChange: (zips: string[]) => void }) => {
    return (
      <button onClick={() => onChange(['123'])}>Mocked LocationSelector</button>
    )
  },
}))
vi.mock('../api/dogs.ts', () => ({
  default: {
    getBreeds: async () => ['Golden Retreiver', 'Labrador Retreiver'],
  },
}))

const filters: DogFilters = {
  breeds: [],
  desc: false,
  sortBy: 'breed',
  zipCodes: [],
}

describe('Filters', () => {
  it('selects breed', async () => {
    const onFilter = fn()
    render(<Filters value={filters} onFilter={onFilter} />)

    // Select breed
    const input = await screen.findByPlaceholderText('Labrador, Beagle, ...')
    fireEvent.change(input, { target: { value: 'Golden' } })
    const option = await screen.findByText('Golden Retreiver')
    act(() => option.click())

    expect(onFilter).toHaveBeenCalledWith({
      breeds: ['Golden Retreiver'],
      desc: false,
      sortBy: 'breed',
      zipCodes: [],
    })
  })

  it('selects location', async () => {
    const onFilter = fn()
    render(<Filters value={filters} onFilter={onFilter} />)

    // Filter by location
    const location = await screen.findByText('Mocked LocationSelector')
    location.click()

    expect(onFilter).toHaveBeenCalledWith({
      breeds: [],
      desc: false,
      sortBy: 'breed',
      zipCodes: ['123'],
    })
  })

  it('selects min age', async () => {
    const onFilter = fn()
    render(<Filters value={filters} onFilter={onFilter} />)

    // Input min age
    const min = await screen.findByPlaceholderText(4)
    fireEvent.change(min, { target: { value: 1 } })

    expect(onFilter).toHaveBeenCalledWith({
      breeds: [],
      desc: false,
      sortBy: 'breed',
      zipCodes: [],
      minAge: 1,
    })
  })

  it('selects max age', async () => {
    const onFilter = fn()
    render(<Filters value={filters} onFilter={onFilter} />)

    // Input max age
    const max = await screen.findByPlaceholderText(12)
    fireEvent.change(max, { target: { value: 5 } })

    expect(onFilter).toHaveBeenCalledWith({
      breeds: [],
      desc: false,
      sortBy: 'breed',
      zipCodes: [],
      maxAge: 5,
    })
  })

  it('selects sort variable', async () => {
    const onFilter = fn()
    render(<Filters value={filters} onFilter={onFilter} />)

    // Change sort
    const sortBy = await screen.findByDisplayValue('Breed')
    fireEvent.change(sortBy, { target: { value: 'age' } })

    expect(onFilter).toHaveBeenCalledWith({
      breeds: [],
      desc: false,
      sortBy: 'age',
      zipCodes: [],
    })
  })

  it('selects sort direction', async () => {
    const onFilter = fn()
    render(<Filters value={filters} onFilter={onFilter} />)

    // Change direction
    const buttons = await screen.findAllByRole('button')
    buttons[buttons.length - 1].click()

    expect(onFilter).toHaveBeenCalledWith({
      breeds: [],
      desc: true,
      sortBy: 'breed',
      zipCodes: [],
    })
  })
})
