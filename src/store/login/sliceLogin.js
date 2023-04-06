import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginData: {
        accessToken: null,
        isLoading: false,
        error: null
    },

    profileData: {
        profile: null,
        isLoading: false,
        error: null
    }
}

export const loginReducer = createSlice({
    name: 'login',
    initialState,
    reducers:{
        loginStart(state){
            state.loginData.isLoading = true
        },
        loginSucces(state, action){
            state.loginData.accessToken = action.payload
            state.loginData.isLoading = false
            state.loginData.error = null
        },
        loginFailure(state, action){
            state.loginData.isLoading = false
            state.loginData.error = action.payload
        },
        loadProfileStart(state){
            state.profileData.isLoading = true
        },
        loadProfileSucces(state, action){
            state.profileData.accessToken = action.payload
            state.profileData.isLoading = false
            state.profileData.error = null
        },
        loadProfileFailure(state, action){
            state.profileData.isLoading= false
            state.profileData.error= action.payload
        },
        logout(){
            return initialState
        }

    }
})

export const { loginStart, loginSucces, loginFailure, loadProfileStart, loadProfileSucces, loadProfileFailure, logout} = loginReducer.actions
export default loginReducer.reducer