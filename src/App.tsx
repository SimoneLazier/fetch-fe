import {
  BrowserRouter,
  Navigate,
  Route,
  RouteProps,
  Routes,
} from 'react-router-dom'
import Login from './pages/Login'
import Error404 from './pages/errors/404'
import useAuth from './composables/useAuth'
import Dogs from './pages/Dogs'
import Dog from './pages/Dog'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLogged } = useAuth()

  return isLogged ? children : <Navigate to="/" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
