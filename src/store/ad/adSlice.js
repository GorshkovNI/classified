import { createSlice } from "@reduxjs/toolkit";
import {fetchDataStart, fetchDataSuccess} from "../auth/userSlice";
import AdService from "../../service/AdService";

const initialState = {
    type: '',
    isAdLoading: false,
    isError: false,
    categories: [],
    fields: [],
    isRedirect: false

}

const ad = createSlice({
    name: 'adSlice',
    initialState,
    reducers: {
        fetchAdDataStart(state){
            state.isAdLoading = true
        },

        fetchAdDataSuccess(state){
            state.isAdLoading = false
        },

        fetchAdDataError(state){
            state.isAdLoading = false
        },

        setType(state, action){
            state.type = action.payload
        },

        setCategories(state, action){
            state.categories = [...action.payload]
        },

        setFields(state, action){
            console.log(action)
            state.fields = [...action.payload]
        },

        setError(state){
            state.isError = true
        },

        removeError(state){
            state.isError = false
        },

        setRedirect(state){
            state.isRedirect = true
        },

        removeRedirect(state){
            state.isRedirect = false
        }
    }
})

export const getCategories = () => async (dispatch) => {
    try{
        dispatch(fetchAdDataStart())
        const response = await AdService.getTypes()
        const category = response.data.map((item) => {
            return {
                category: item.category,
                translate: item.translate
            }
        })
        dispatch(setCategories(category))
        dispatch(fetchAdDataSuccess())

    } catch (e){
        console.log(e)
    }
}

export const getCategoryFields = (category) => async (dispatch) => {
    try {
        dispatch(fetchAdDataStart())
        const response = await AdService.getFieldsCategory(category)
        if(response.data.fields?.length === 0){
            dispatch(fetchDataSuccess())
            dispatch(fetchAdDataSuccess())
            return
        }
        dispatch(fetchAdDataSuccess())
        dispatch(setFields(response.data.fields))

    } catch (e){
        console.log(e)
    }
}

export const createNewAdd = (data) => async (dispatch) => {
    try {
        dispatch(fetchAdDataStart())
        const response = await AdService.createNewAdd(data)
        console.log(response)
        dispatch(fetchAdDataSuccess())
        dispatch(setRedirect())
        setTimeout(() => {
            dispatch(removeRedirect())
        }, 1000)

    } catch (e){
        dispatch(setError())
        console.log(e)
    }

}

export const { fetchAdDataStart, fetchAdDataSuccess, setType, setCategories, setFields, setError, removeError, setRedirect, removeRedirect, fetchAdDataError } = ad.actions
export default ad.reducer