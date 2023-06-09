import { fireEvent, render, screen } from '@testing-library/react'
import Login from './Login'
import { vi } from 'vitest'
import { fn } from '@vitest/spy'

const login = fn()
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
    const btn = await screen.findByRole('button')
    fireEvent.click(btn)

    expect(login).toHaveBeenCalledWith('test', 'test@test.com')
  })
})
