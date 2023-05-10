import { createSlice } from "@reduxjs/toolkit";
import UserAdService from "../api/userAdService";
import {Dispatch} from "@reduxjs/toolkit";


const initialState = {
    avatar: '',
    name: '',
    isUserDataLoading: false,
    errorUserData: false,
    emptyData: false,
    ads: []
}

const userAd = createSlice({
    name: 'userAd',
    initialState,
    reducers:{
        fetchDataUserLoading(state){
            state.isUserDataLoading = true
        },
        fetchDataUserSuccess(state){
            state.isUserDataLoading = false
        },
        setAvatar(state, action){
            const avatar = action.payload
            state.avatar = avatar
        },
        setName(state, action){
            const name = action.payload
            state.name = name
        },
        setAds(state, action){
            state.ads = [...action.payload]
        },
        setError(state){
            state.errorUserData = true
        },
        removeError(state){
            state.errorUserData = false
        },
        setEmptyData(state){
            state.emptyData = true
        }
    }
})

export const getProfileInfo = () => async (dispatch: Dispatch) => {
    try {
        console.log('Запрашиваю данные о профиле')
        dispatch(fetchDataUserLoading())
        const response = await UserAdService.userProfileInfo(localStorage.getItem('user_id'))
        if(response.data.length === 0){
            dispatch(setError)
            return
        }
        dispatch(setAds(response.data?.ads))
        console.log(response)
        dispatch(fetchDataUserSuccess())
    }catch (e){
        console.log('ОШИБКА ', e)
    }
}

export const {fetchDataUserLoading, fetchDataUserSuccess, setAvatar, setName, setAds, setError, removeError} = userAd.actions
export default userAd.reducer