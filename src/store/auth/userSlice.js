import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../../service/AuthService";
import axios from "axios";
import { API_URL } from "../../http";

const initialState = {
    userData: {
        name: localStorage.getItem('name') | 'User'
    },
    isAuth: false,
    isLoading: false,
    invalidLogging: false,
    serverError: false
}

const user = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAuth(state) {
            state.isAuth = true
        },

        removeAuth(state) {
            state.isAuth = false
        },

        setInvalidLogging(state) {
            state.invalidLogging = true
        },

            removeInvalidLogging(state) {
            state.invalidLogging = false
        },

        setDataUser(state, action) {
            state.userData.name = action.payload
            localStorage.setItem('name', action.payload)
        },

        fetchDataStart(state) {
            state.isLoading = true
        },

        fetchDataSuccess(state) {
            state.isLoading = false
        },

        fetchDataError(state) {
            state.isLoading = false
            state.invalidLogging = true
        },
    }
})


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(fetchDataStart())
        console.log('начал логинитсья')
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('user_id', response.data.user['_id'])
        dispatch(setAuth())
        dispatch(setDataUser(response.data.user.name))
        dispatch(fetchDataSuccess())
    } catch (e) {
        console.log(e)
        dispatch(fetchDataError())
    }
};

export const registration = (name, email, phone, password) => async (dispatch) => {
    try {
        dispatch(fetchDataStart())
        const dateRegistration = new Date().getFullYear()
        console.log(typeof dateRegistration)
        const response = await AuthService.registration(name, email, phone, password, dateRegistration);
        localStorage.setItem('token', response.data.accessToken)
       // dispatch(setAuth())
       // dispatch(setDataUser(response.data.user.name))
        dispatch(fetchDataSuccess())

    } catch (error) {
        console.log(error);
    }
};

export const logout = () => async (dispatch) => {
    const refreshToken = localStorage.getItem('token')
    const response = await AuthService.logout(refreshToken)
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('user_id')
    dispatch(removeAuth())
};

export const checkAuth = () => async (dispatch) => {
    try{
        dispatch(fetchDataStart())
        console.log('ЗАПУЩЕН CHECKAUTH')
        const res = await axios.get(`${API_URL}api/refresh`, { withCredentials: true })
        console.log(res)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth())
        dispatch(setDataUser(res.data.user.name))
        dispatch(fetchDataSuccess())
    }
    catch(e){

        console.log('Ошибка при проверке авторизации')
    }
    
}

export const { setAuth, removeAuth, fetchDataStart, fetchDataSuccess, setDataUser, setInvalidLogging, removeInvalidLogging, fetchDataError } = user.actions;
export default user.reducer