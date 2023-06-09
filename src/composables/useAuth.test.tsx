import { vi } from 'vitest'
import { fn } from '@vitest/spy'
import useAuth from './useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { waitFor } from '@testing-library/dom'

vi.mock('axios', () => ({ default: { post: fn() } }))
vi.mock('react-router', () => ({ useNavigate: () => fn() }))
vi.mock('../store', () => ({
  useAppDispatch: () => () => fn(),
  useAppSelector: () => ({
    name: 'test',
    email: 'test@test.com',
    auth_expires: Date.now(),
  }),
}))

describe('useAuth custom hook', () => {
  it('logs in', () => {
    const { login } = useAuth()
    login('test', 'test@test.com')
    expect(axios.post).toHaveBeenCalled()
    waitFor(() => expect(useNavigate()).toHaveBeenCalled())
  })

  it('logs out', () => {
    const { logout } = useAuth()
    logout()
    expect(axios.post).toHaveBeenCalled()
    waitFor(() => expect(useNavigate()).toHaveBeenCalled())

    logout(true)
    waitFor(() => expect(useNavigate()).toHaveBeenCalled())
  })
})
