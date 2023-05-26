import { createSlice } from "@reduxjs/toolkit";
import {Dispatch} from "@reduxjs/toolkit";
import SearchService from "../../../service/SearchService";


const initialState = {
    ads:[],
    isSearchLoading: false,
    priceFrom: null,
    priceTo: null

}

const search = createSlice({
    name: 'search',
    initialState,
    reducers:{
        fetchSearchLoadingStart(state){
            state.isSearchLoading = true
        },
        fetchSearchLoadingSuccess(state){
            state.isSearchLoading = false
        },
        setAds(state, action){
            state.ads = [...action.payload]
        },
        setPriceTo(state, action){
            state.priceTo = action.payload
        },
        setPriceFrom(state, action){
            state.priceFrom = action.payload
        },

    }
})

export const getAdsOnRequest = (text) => async (dispatch) => {
    try {
        dispatch(fetchSearchLoadingStart())
        const response = await SearchService.searchAd(text)
        dispatch(setAds(response?.data))
        dispatch(fetchSearchLoadingSuccess())
        console.log(response)
    }catch (e){
        console.log('ОШИБКА ', e)
    }
}

export const getAdsTransport = (city) => async (dispatch) => {
    try{
        dispatch(fetchSearchLoadingStart())
        console.log(city)
        const response = await SearchService.searchCar(city)
        console.log(response)
        dispatch(setAds(response?.data))
        dispatch(fetchSearchLoadingSuccess())
    } catch(e){
        console.log(e)
    }
}

export const {fetchSearchLoadingStart, fetchSearchLoadingSuccess, setAds, setPriceTo, setPriceFrom} = search.actions
export default search.reducer