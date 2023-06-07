import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Error404 from './pages/errors/404'
import Dogs from './pages/Dogs'
import Dog from './pages/Dog'
import useAuth from './composables/useAuth'
import AppLayout from './layouts/AppLayout'
import Error500 from './pages/errors/500'
import axios from 'axios'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLogged } = useAuth()
  return isLogged ? children : <Navigate to="/" />
}

function Router() {
  const { isLogged, logout } = useAuth()

  axios.interceptors.response.use((res) => {
    if (res.status === 401) logout()
    return res
  })

  return (
    <Routes>
      <Route errorElement={<Error500 />}>
        <Route
          path="/"
          element={isLogged ? <Navigate to="/dogs" /> : <Login />}
        />
        <Route element={<AppLayout />}>
          <Route
            path="/dogs"
            element={
              <PrivateRoute>
                <Dogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/dogs/:id"
            element={
              <PrivateRoute>
                <Dog />
              </PrivateRoute>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default Router
