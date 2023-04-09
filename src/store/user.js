import {createSlice} from "@reduxjs/toolkit";
import AuthService from "../service/AuthService";
import axios from "axios";
import {API_URL} from "../http";

const initialState = {
    userData: {},
    isAuth: false,
    isLoading: false
}

const user = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{
        setAuth(state){
            state.isAuth = true
        },

        removeAuth(state){
            state.isAuth = false
        },

        fetchDataStart(state){
            state.isLoading = true
        },

        fetchDataSuccess(state){
            state.isLoading = false
        },

    }
})


export const login = (email, password) => async (dispatch) => {
    try {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setAuth())
    } catch (e) {

    }
};

export const registration = (email, password) => async (dispatch) => {
    try {
        const response = await AuthService.registration(email, password);
        console.log(response)
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth())
    } catch (error) {
        console.log(error);
    }
};

export const logout = () => async (dispatch) => {
    const response = await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(removeAuth())
};

export const checkAuth = () => async (dispatch) => {
    dispatch(fetchDataStart())
    const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
    console.log(res)
    localStorage.setItem('token', res.data.accessToken)
    console.log('Установка авторизации')
    dispatch(setAuth())
    dispatch(fetchDataSuccess())
}

export const { setAuth, removeAuth,fetchDataStart,fetchDataSuccess } = user.actions;
export default user.reducer