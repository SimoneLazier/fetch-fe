import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'
import { ErrorBoundary } from 'react-error-boundary'
import Error500 from './pages/errors/500'

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<Error500 />}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>,
)
