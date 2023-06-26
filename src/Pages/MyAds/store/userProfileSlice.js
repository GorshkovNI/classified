import { createSlice } from "@reduxjs/toolkit";
import UserAdService from "../api/userAdService";
import {Dispatch} from "@reduxjs/toolkit";


const initialState = {
    userInfo:{
        avatar: '',
        name: '',
        user_id: '',
        phone: '',
        email: '',
        dateRegistration: '',
        totalRating: 0,
        reviews: []
    },
    city: '',
    isUserDataLoading: false,
    errorUserData: false,
    emptyData: false,
    isDelete: false,
    ads: [],
    errorSetReview: false


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
            state.userInfo.avatar = action.payload
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
        },
        deleteAds(state, action){
            const ads_id = action.payload
            state.ads = state.ads.filter((ad) => ad['_id'] !== ads_id)
        },

        isLoadAvatar(state, action){
            state.loadAvatar = action.payload
        },

        setInfoUser(state, action){
            const user = action.payload[0]
            console.log(user)
            state.userInfo.avatar = user.photo ? user.photo : ''
            state.userInfo.name = user.name
            state.userInfo.email = user.email
            state.userInfo.phone = user.phone
            state.userInfo.user_id = user['_id']
        },

        setRating(state, action){
            if(action.payload == null){
                state.userInfo.totalRating = 0
                return
            }
            const count = action.payload.count
            const totalRating = action.payload.totalRating
            state.userInfo.totalRating = Number((totalRating/count).toFixed(1))
            state.userInfo.reviews = action.payload.review
        },

        setNewCity(state, action){
            console.log(action.payload)
            state.city = action.payload
        },


        setErrorReview(state){
            state.errorSetReview = true
        },

        setUpAd(state, action){
            state.ads.forEach((ad) => {
                if(ad['_id'] == action.payload){
                    ad.up = true
                }
            })
        }
    }
})

export const getProfileInfo = (id) => async (dispatch) => {
    try {
        console.log('Запрашиваю данные о профиле')
        dispatch(fetchDataUserLoading())
        const response = await UserAdService.userProfileInfo(id)
        console.log(response)
        if(response.data.length === 0){
            dispatch(setError)
            return
        }
        dispatch(setInfoUser(response.data?.user))
        dispatch(setAds(response.data?.ads))
        dispatch(setRating(response.data?.review))
        dispatch(fetchDataUserSuccess())
    }catch (e){
        console.log('ОШИБКА ', e)
    }
}

export const deleteAd = (categoryId, ads_id) => async (dispatch) => {
    try {
        const res = await UserAdService.deleteAd(categoryId, ads_id)
        console.log(res)
        dispatch(deleteAds(ads_id))
    }catch (e){
        console.log('Ошибка при удалении ', e)
    }
}

export const upAd = (categoryId, ads_id) => async (dispatch) => {
    try {
        const res = await UserAdService.upAds(categoryId, ads_id)
        dispatch(setUpAd(ads_id))
    }catch (e){
        console.log('Ошибка при поднятии в топ', e)
    }
}

export const setNewReview = (id, review) => async (dispatch) => {
    try {
        dispatch(fetchDataUserLoading())
        const res = await UserAdService.reviewAd(id, review)
        if(res.data === 'Уже есть отзыв'){
            console.log(12312123412341234)
            dispatch(setErrorReview())
            return
            dispatch(fetchDataUserSuccess())
        }
        dispatch(fetchDataUserSuccess())
        console.log(res)
    }catch (e){
        console.log('Ошибка отравки отзыва: ', e)
    }
}

export const {fetchDataUserLoading, fetchDataUserSuccess, setAvatar, setInfoUser, setAds, setError, removeError, deleteAds,  isLoadAvatar, setRating, setNewCity, setErrorReview, setUpAd} = userAd.actions
export default userAd.reducer