import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './counterSlice'
import authReducer  from './authSlice'
import dataReducer  from './dataSlice'
import tokenReducer  from './token'
import { popupformReducer } from './helperSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    token: tokenReducer,
    GetData: dataReducer,
    statusForm: popupformReducer
  }
})