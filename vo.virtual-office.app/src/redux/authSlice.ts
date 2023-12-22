import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseLoginModel } from "../model/model";

interface AuthState {
    value: ResponseLoginModel,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            data: false,
            email: "",
            id: 0,
            status: 0,
            success: false,
            token: ''
        } as ResponseLoginModel,
    } as AuthState,
    reducers: {
        setUser: (state: { value: ResponseLoginModel; }, action: PayloadAction<ResponseLoginModel>) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions

export default authSlice.reducer