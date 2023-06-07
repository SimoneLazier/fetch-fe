import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Error404 from './pages/errors/404'
import Dogs from './pages/Dogs'
import Dog from './pages/Dog'
import useAuth from './composables/useAuth'
import AppLayout from './layouts/AppLayout'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLogged } = useAuth()
  return isLogged ? children : <Navigate to="/" />
}

function Router() {
  const { isLogged } = useAuth()
  return (
    <Routes>
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
          path="/dogs/:match"
          element={
            <PrivateRoute>
              <Dog />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default Router
