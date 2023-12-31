import { createSlice } from '@reduxjs/toolkit'

export const popupformSlice = createSlice({
  name: 'popupform',
  initialState: {
    value: false
  },
  reducers: {
    setStatus: (state) => {
        console.log(state)
        state.value = !state.value
    },
  }
})

// Action creators are generated for each case reducer function
export const { setStatus } = popupformSlice.actions
export const  popupformReducer = popupformSlice.reducer;