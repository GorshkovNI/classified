import {createSlice} from "@reduxjs/toolkit";
import SearchService from "../../../../../service/SearchService";
import {
    fetchSearchLoadingStart,
    fetchSearchLoadingSuccess,
    setAds
} from "../../../../../component/SearchBlock/store/searchSlice";

const initialState = {
    ads: [],
    isLoading: false,
    filters:{
        marka: '',
        model: '',
        yearTo: '',
        yearFrom: ''
    }

}

const transport = createSlice({
    name: 'transport',
    initialState,
    reducers:{
        setIsLoadingTrue(state){
            state.isLoading = true
        },

        setIsLoadingFalse(state){
            state.isLoading = false
        },

        setAd(state, action){
            console.log(action)
            state.ads = [...action.payload]
        },

        setFilters(state, action){
            console.log(action.payload)
            state.filters.marka = action.payload.marka
            state.filters.model = action.payload.model
            state.filters.yearTo = action.payload.yearTo
            state.filters.yearFrom = action.payload.yearFrom
        }
    }
})

export const getAdsTransport = (city) => async (dispatch) => {
    try{
        dispatch(setIsLoadingTrue())
        console.log(city)
        const response = await SearchService.searchCar(city)
        console.log(response)
        dispatch(setAd(response?.data))
        dispatch(setIsLoadingFalse())
    } catch(e){
        console.log(e)
    }
}

export const {setIsLoadingTrue, setIsLoadingFalse, setAd, setFilters} = transport.actions
export default transport.reducer