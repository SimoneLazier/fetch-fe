import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { setUser } from '../store/auth'
import axios from 'axios'

/**
 * Custom hook to handle authentication
 *
 * @returns The user, whether they're logged, and functions to perform login and logout
 */
const useAuth = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const isLogged = user !== undefined
  const dispatch = useAppDispatch()

  const login = async (name: string, email: string) => {
    await axios.post('/auth/login', { name, email })
    const auth_expires = Date.now() + 60 * 60 * 1000
    dispatch(setUser({ name, email, auth_expires }))
    navigate('/dogs')
  }

  const logout = async (clientOnly = false) => {
    // Allow client-side only logout in case the auth expires while using the app
    if (!clientOnly) await axios.post('/auth/logout')
    dispatch(setUser(undefined))
    navigate('/')
  }
  return { user, isLogged, login, logout }
}

export default useAuth
