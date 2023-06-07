import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { setUser } from '../store/auth'

const useAuth = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const isLogged = user !== undefined
  const dispatch = useAppDispatch()
  const login = (name: string, email: string) => {
    dispatch(setUser({ name, email }))
    navigate('/dogs')
  }
  const logout = () => {
    dispatch(setUser(undefined))
    navigate('/')
  }
  return { user, isLogged, login, logout }
}

export default useAuth
