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
    invalidLogging: false
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

    }
})


export const login = (email, password) => async (dispatch) => {
    try {
        const response = await AuthService.login(email, password)
        console.log(response)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setAuth())
        dispatch(setDataUser(response.data.user.name))
    } catch (e) {
        dispatch(setInvalidLogging())
    }
};

export const registration = (name, email, password) => async (dispatch) => {
    try {
        dispatch(fetchDataStart())
        const response = await AuthService.registration(name, email, password);
        console.log(response)
        localStorage.setItem('token', response.data.accessToken)
       // dispatch(setAuth())
       // dispatch(setDataUser(response.data.user.name))
        dispatch(fetchDataSuccess())

    } catch (error) {
        console.log(error);
    }
};

export const logout = () => async (dispatch) => {
    const response = await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(removeAuth())
    localStorage.removeItem('name')
};

export const checkAuth = () => async (dispatch) => {
    dispatch(fetchDataStart())
    const res = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
    console.log(res)
    localStorage.setItem('token', res.data.accessToken)
    console.log('Установка авторизации')
    dispatch(setAuth())
    dispatch(setDataUser(res.data.user.name))
    dispatch(fetchDataSuccess())


}

export const { setAuth, removeAuth, fetchDataStart, fetchDataSuccess, setDataUser, setInvalidLogging, removeInvalidLogging } = user.actions;
export default user.reducer