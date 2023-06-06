import { useState } from 'react'

const useAuth = () => {
  const [isLogged, setIsLogged] = useState<unknown>()
  const login = () => setIsLogged(true)

  return { isLogged, login }
}

export default useAuth
