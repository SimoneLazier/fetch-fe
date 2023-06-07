import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
  },
  reducers: {
    setIsLogged: (state, payload: PayloadAction<boolean>) => {
      state.isLogged = payload.payload
    },
  },
})

export const { setIsLogged } = auth.actions
export default auth.reducer
