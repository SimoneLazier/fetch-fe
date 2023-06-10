import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from './Login'
import { vi } from 'vitest'
import { fn } from '@vitest/spy'

const login = fn(() => Promise.resolve())
vi.mock('../composables/useAuth', () => ({
  default: () => ({ login }),
}))

describe('Login Page', () => {
  it('lets the user log in', async () => {
    render(<Login />)

    const name = await screen.findByPlaceholderText('Name')
    const email = await screen.findByPlaceholderText('Email address')
    fireEvent.change(name, { target: { value: 'test' } })
    fireEvent.change(email, { target: { value: 'test@test.com' } })
    const btn = await screen.findByRole<HTMLButtonElement>('button')
    fireEvent.click(btn)

    await waitFor(() => expect(btn.disabled).toBeFalsy())
    expect(login).toHaveBeenCalledWith('test', 'test@test.com')
  })
})
