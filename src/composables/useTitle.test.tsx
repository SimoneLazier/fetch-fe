import { render } from '@testing-library/react'
import useTitle from './useTitle'

const MockComponent = ({ title }: { title?: string }) => {
  useTitle(title)
  return <></>
}

document.title = 'App'

describe('useTitle custom hook', () => {
  it('does nothing if no title is passed', () => {
    render(<MockComponent />)
    expect(document.title).toBe('App')
  })

  it('prepends an additional title', () => {
    render(<MockComponent title="Title" />)
    expect(document.title).toBe('Title - App')
  })
})
