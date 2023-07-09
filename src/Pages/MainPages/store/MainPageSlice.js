import { createSlice } from "@reduxjs/toolkit";
import {Dispatch} from "@reduxjs/toolkit";
import AdService from "../../../service/AdService";


const initialState = {
    adsCurrentCity: [],
    adsOtherCity: [],
    city: '',
    isLoadingByCity: false,
    currentPage: 1,
    countriesPerPage: 3
}

const mainPage = createSlice({
    name: 'mainPage',
    initialState,
    reducers:{
        setAdsCurrentCity(state, action){
            state.adsCurrentCity = action.payload
        },

        fetchAdsCity(state, action){
            console.log(action.payload)
            state.isLoadingByCity = action.payload
        },

        setCC(state, action){
            state.city = action.payload
        }

    }
})

export const getAdsByCity = (city,initialState) => async (dispatch) => {
    try {
        dispatch(fetchAdsCity(true))
        const response = await AdService.getAdByCity(city)
        console.log(`Загружаю по городу ${city}`)
        console.log(response)
        /* const lastCountryIndex = initialState.currentPage * initialState.countriesPerPage
        console.log(lastCountryIndex) */



        dispatch(setAdsCurrentCity(response.data))
        dispatch(fetchAdsCity(false))
    }catch (e){
        console.log('ОШИБКА ', e)
    }
}


export const {setAdsCurrentCity, fetchAdsCity, setCC} = mainPage.actions
export default mainPage.reducer