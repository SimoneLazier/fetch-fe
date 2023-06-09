import { render } from '@testing-library/react'
import Error500 from './500'

describe('500', () => {
  it('renders', () => {
    render(<Error500 />)
  })
})
