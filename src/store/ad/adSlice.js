import { createSlice } from "@reduxjs/toolkit";
import {fetchDataStart, fetchDataSuccess} from "../auth/userSlice";
import AdService from "../../service/AdService";

const initialState = {
    type: '',
    isAdLoading: false,
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
            console.log(action.payload)
            state.categories = [...action.payload]
        },

        setFields(state, action){

        }
    }
})

export const getCategories = () => async (dispatch) => {
    try{
        dispatch(fetchDataStart())
        const response = await AdService.getTypes()
        const category = response.data.map((item) => {
            return {
                category: item.category,
                translate: item.translate
            }
        })
        console.log(response)
        dispatch(setCategories(category))
        dispatch(fetchDataSuccess())
    } catch (e){
        console.log(e)
    }
}

export const getFields = () => async (dispatch) => {
    try {
        console.log(123)
    } catch (e){
        console.log(e)
    }
}


export const { fetchAdDataStart, fetchAdDataSuccess, setType, setCategories } = ad.actions
export default ad.reducer