import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: () => {
    const savedUser: User | null = JSON.parse(
      localStorage.getItem('user') ?? 'null',
    )
    if (!savedUser || savedUser.auth_expires < Date.now())
      return { user: undefined }

    return {
      user: savedUser,
    }
  },
  reducers: {
    setUser: (state, payload: PayloadAction<User | undefined>) => {
      state.user = payload.payload
      if (payload.payload)
        localStorage.setItem('user', JSON.stringify(payload.payload))
      else localStorage.removeItem('user')
    },
  },
})

export const { setUser } = auth.actions
export default auth.reducer
