import { createSlice } from "@reduxjs/toolkit";
import {fetchDataStart, fetchDataSuccess} from "../auth/userSlice";
import AdService from "../../service/AdService";

const initialState = {
    type: '',
    isAdLoading: false,
    isError: false,
    categories: [],
    fields: []

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
            dispatch(setError())
            dispatch(fetchDataSuccess())
            return
        }
        dispatch(setFields(response.data.fields))
        dispatch(fetchAdDataSuccess())
    } catch (e){
        console.log(e)
    }
}

export const createNewAdd = (data) => async (dispatch) => {
    try {
        dispatch(fetchAdDataStart())
        const response = await AdService.createNewAdd(data)
        console.log(data)
        dispatch(fetchAdDataSuccess())
    } catch (e){
        console.log(e)
    }

}

export const { fetchAdDataStart, fetchAdDataSuccess, setType, setCategories, setFields, setError, removeError } = ad.actions
export default ad.reducer