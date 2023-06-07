import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { setUser } from '../store/auth'
import axios from 'axios'

// Handle token expiration
const useAuth = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const isLogged = user !== undefined
  const dispatch = useAppDispatch()
  const login = async (name: string, email: string) => {
    await axios.post('/auth/login', { name, email })
    dispatch(setUser({ name, email }))
    navigate('/dogs')
  }
  const logout = async () => {
    await axios.post('/auth/logout')
    dispatch(setUser(undefined))
    navigate('/')
  }
  return { user, isLogged, login, logout }
}

export default useAuth
