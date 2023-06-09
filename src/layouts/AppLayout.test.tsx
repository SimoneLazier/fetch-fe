import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AppLayout from './AppLayout'
import { vi } from 'vitest'
import { fn } from '@vitest/spy'
import useAuth from '../composables/useAuth'

vi.mock('../composables/useAuth', () => ({
  default: () => ({
    logout: fn(),
    user: { name: 'test', email: 'test@test.com' },
  }),
}))
vi.mock('react-router', () => ({ Outlet: () => <></> }))

describe('App Layout', () => {
  it('opens the menu', async () => {
    render(<AppLayout />)
    const menuButton = await screen.findByText('Open main menu')
    fireEvent.click(menuButton)
    waitFor(async () =>
      expect(await screen.findByText('test@test.com')).toBeInTheDocument(),
    )
  })

  it('lets the user log out', async () => {
    render(<AppLayout />)
    const userButton = await screen.findByText('Open user menu')
    fireEvent.click(userButton)
    const logoutBtn = await screen.findByText('Sign out')
    fireEvent.click(logoutBtn)
    waitFor(() => expect(useAuth().logout).toHaveBeenCalled())
  })
})
