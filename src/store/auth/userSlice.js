import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../../service/AuthService";
import axios from "axios";
import { API_URL } from "../../http";

const initialState = {
    userData: {
        name: '',
        userId: '',
        email: '',
        phone: '',
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
            const name = action.payload
            console.log(action.payload.name)
            localStorage.setItem('name', action.payload.name)
            state.userData.name = action.payload.name
            state.userData.userId = action.payload['_id']
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
        console.log(response.data)
        localStorage.setItem('token', response.data.accessToken)
        document.cookie = `refreshToken=${response.data.refreshToken}; domain=https://getit.herokuapp.com/; path=/; max-age=86400; secure`;
        localStorage.setItem('user_id', response.data.user['_id'])
        dispatch(setAuth())
        dispatch(setDataUser(response.data.user))
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
        console.log('RES CERF: ', res)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth())
        dispatch(setDataUser(res.data.user))
        dispatch(fetchDataSuccess())
    }
    catch(e){
        dispatch(fetchDataSuccess())
        console.log('Ошибка при проверке авторизации')
    }
    
}

export const { setAuth, removeAuth, fetchDataStart, fetchDataSuccess, setDataUser, setInvalidLogging, removeInvalidLogging, fetchDataError } = user.actions;
export default user.reducer