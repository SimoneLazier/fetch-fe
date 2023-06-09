import { act, render, screen } from '@testing-library/react'

describe('App', () => {
  it('renders on the login page', async () => {
    render(<div id="root"></div>)
    await act(async () => await import('./main'))
    expect(
      await screen.findByText('Sign in to your account'),
    ).toBeInTheDocument()
  })
})
