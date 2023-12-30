import { createSlice } from '@reduxjs/toolkit'

export const token = createSlice({
  name: 'GetData',
  initialState: {
    value: null
  },
  reducers: {
    setToken: (state, action) => {
        console.log(action.payload)
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setToken, } = token.actions

export default token.reducer