import { render } from '@testing-library/react'
import Map from './Map'
import { fn } from '@vitest/spy'

describe('Map', () => {
  it('renders', () => {
    render(<Map center={{ lat: 0, lng: 0 }} onSelect={fn()} />)
  })
})
