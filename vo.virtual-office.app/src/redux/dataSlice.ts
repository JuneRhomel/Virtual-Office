import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'GetData',
  initialState: {
    value: []
  },
  reducers: {
    setData: (state, action) => {
        state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setData, } = dataSlice.actions

export default dataSlice.reducer