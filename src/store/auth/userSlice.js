import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../../service/AuthService";
import axios from "axios";
import { API_URL } from "../../http";
import UserService from "../../service/UserService";

const initialState = {
    userData: {
        name: '',
        userId: '',
        email: '',
        phone: '',
        photo: ''
    },

    errorActivate: '',
    isAuth: false,
    isLoading: false,
    invalidLogging: false,
    serverError: false,

    loadAvatar: false
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
            state.errorActivate = false
        },

        setDataUser(state, action) {
            const name = action.payload
            console.log(action.payload.name)
            localStorage.setItem('name', action.payload.name)
            state.userData.name = action.payload.name
            state.userData.userId = action.payload['_id']
            state.userData.photo = action.payload.photo
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

        setErrorActivate(state, action){
            console.log(action.payload)
            state.errorActivate = action.payload
        },

        setPhoto(state, action){
            state.userData.photo = action.payload
        },

        isLoadAvatar(state, action){
            state.loadAvatar = action.payload
        },

    }
})


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(fetchDataStart())
        console.log('начал логинитсья')
        const response = await AuthService.login(email, password)
        if(response.data.user.isActivate === false){
            console.log('Активируй аккаунт')
            dispatch(setErrorActivate(true))
            dispatch(fetchDataSuccess())
            //dispatch(setErrorActivate(false))
            return
        }
        console.log(response.data)
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
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
        //localStorage.setItem('token', response.data.accessToken)
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
    try {
        dispatch(fetchDataStart())
        console.log('ЗАПУЩЕН CHECKAUTH')
        const refreshToken = localStorage.getItem('refreshToken')
        console.log(refreshToken)
        const res = await AuthService.refresh(refreshToken)
        console.log('RES : ', res)
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        dispatch(setAuth())
        dispatch(setDataUser(res.data.user))
        dispatch(fetchDataSuccess())
    } catch (e) {
        dispatch(fetchDataSuccess())
        console.log('Ошибка при проверке авторизации')
    }
}

export const changeAvatar = (avatar, user_id) => async (dispatch) => {
    try {
        dispatch(isLoadAvatar(true))
        dispatch(setPhoto(avatar))
        const response = await UserService.changeAvatar(avatar, user_id)
        dispatch(isLoadAvatar(false))
        console.log(response)
    }catch (e) {
        console.log(e)
    }
}

// export const activate = () => async (dispatch) => {
//         try {
//
//         }catch (e){
//
//         }
//     }
// }

export const { setAuth, removeAuth, fetchDataStart, fetchDataSuccess, setDataUser, setInvalidLogging, removeInvalidLogging, fetchDataError, setErrorActivate, setPhoto, isLoadAvatar } = user.actions;
export default user.reducer