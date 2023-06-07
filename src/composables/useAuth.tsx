import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { setIsLogged } from '../store/auth'

const useAuth = () => {
  const navigate = useNavigate()
  const isLogged = useAppSelector((state) => state.auth.isLogged)
  const dispatch = useAppDispatch()
  const login = () => {
    dispatch(setIsLogged(true))
    navigate('/dogs')
  }
  const logout = () => {
    dispatch(setIsLogged(false))
    navigate('/')
  }
  return { isLogged, login, logout }
}

export default useAuth
