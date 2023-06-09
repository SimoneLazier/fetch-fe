import { vi } from 'vitest'
import { fn } from '@vitest/spy'
import useAuth from './useAuth'
import { waitFor } from '@testing-library/dom'

const navigate = fn()
const post = fn()
vi.mock('axios', () => ({ default: { post: () => post() } }))
vi.mock('react-router', () => ({ useNavigate: () => navigate }))
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
    expect(post).toHaveBeenCalled()
    waitFor(() => expect(navigate).toHaveBeenCalled())
  })

  it('logs out', () => {
    const { logout } = useAuth()
    logout()
    expect(post).toHaveBeenCalled()
    waitFor(() => expect(navigate).toHaveBeenCalled())

    logout(true)
    waitFor(() => expect(navigate).toHaveBeenCalled())
  })
})
