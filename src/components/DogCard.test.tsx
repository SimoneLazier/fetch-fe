import { render, screen } from '@testing-library/react'
import DogCard from './DogCard'
import { fn } from '@vitest/spy'

const mockDog: Dog = {
  id: '1',
  age: 1,
  breed: 'Golden Retriever',
  name: 'Sparky',
  img: '',
  zip_code: '60607',
}

describe('Dog Card', () => {
  it('renders', () => {
    render(
      <DogCard
        active={false}
        dog={mockDog}
        onGetResults={fn()}
        onToggleSelect={fn()}
      />,
    )
  })

  it('toggles the active state', async () => {
    const toggleFn = fn()
    render(
      <DogCard
        active={false}
        dog={mockDog}
        onGetResults={fn()}
        onToggleSelect={toggleFn}
      />,
    )

    const link = await screen.findByRole('link')
    link.click()

    expect(toggleFn).toHaveBeenCalled()
  })

  it('emits the get results event', async () => {
    const toggleFn = fn()
    render(
      <DogCard
        active={true}
        dog={mockDog}
        onGetResults={toggleFn}
        onToggleSelect={fn()}
      />,
    )

    const button = await screen.findByRole('button')
    button.click()

    expect(toggleFn).toHaveBeenCalled()
  })
})
