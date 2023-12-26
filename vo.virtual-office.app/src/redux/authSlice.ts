import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseLoginModel } from "../model/model";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
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
        logIn: (state: { value: ResponseLoginModel; }, action: PayloadAction<ResponseLoginModel>) => {
            state.value = action.payload
            const token = action.payload.token;
            const expirationDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
            cookies.set('token', token, { expires: expirationDate });
            location.href = '/'
        },
        logOut: (state) => {
            state.value = {
                data: false,
                email: "",
                id: 0,
                status: 0,
                success: false,
                token: ''
            }
            cookies.remove('token')
            location.href = '/login'
        }
    }
})

// Action creators are generated for each case reducer function
export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer


