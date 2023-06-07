import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: {
    user: undefined as User | undefined,
  },
  reducers: {
    setUser: (state, payload: PayloadAction<User | undefined>) => {
      state.user = payload.payload
    },
  },
})

export const { setUser } = auth.actions
export default auth.reducer
