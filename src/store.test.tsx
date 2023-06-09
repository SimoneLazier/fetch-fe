import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import store, { useAppDispatch, useAppSelector } from './store/index.tsx'
import { setUser } from './store/auth.tsx'

const Element = () => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  setTimeout(
    () =>
      dispatch(
        setUser({
          name: 'test',
          email: 'test@test.com',
          auth_expires: Date.now(),
        }),
      ),
    500,
  )
  return <div>{user ? user.name : 'Undefined user'}</div>
}

describe('Store', () => {
  it('creates a working store', async () => {
    render(
      <Provider store={store}>
        <Element />
      </Provider>,
    )
    expect(await screen.findByText('Undefined user'))
    await waitFor(async () => expect(await screen.findByText('test')))
  })
})
