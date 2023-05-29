import {createSlice} from "@reduxjs/toolkit";
import SearchService from "../../../../../service/SearchService";


const initialState = {
    ads: [],
    isLoading: false,
    filters:{
        squareTo: 0,
        squareFrom: 0,
        squareKitchenFrom: 0,
        squareKitchenTo: 0,
        floorTo: 0,
        floorFrom: 0,
        bathroom: ''
    }

}

const rent = createSlice({
    name: 'rent',
    initialState,
    reducers:{
        setIsLoadingTrue(state){
            state.isLoading = true
        },

        setIsLoadingFalse(state){
            state.isLoading = false
        },

        setAdRent(state, action){
            console.log(action)
            state.ads = [...action.payload]
        },

        setFilterss(state, action){
            console.log(action.payload)
            state.filters.squareTo = action.payload.squareTo
            state.filters.squareFrom = action.payload.squareFrom
            state.filters.squareKitchenFrom = action.payload.squareKitchenFrom
            state.filters.squareKitchenTo = action.payload.squareKitchenTo
            state.filters.floorTo = action.payload.floorTo
            state.filters.floorFrom = action.payload.floorFrom
            state.filters.bathroom = action.payload.bathroom
        }
    }
})

export const getAdsRent = (city) => async (dispatch) => {
    try{
        dispatch(setIsLoadingTrue())
        console.log(city)
        const response = await SearchService.searchRent(city)
        console.log(response)
        dispatch(setAdRent(response?.data))
        dispatch(setIsLoadingFalse())
    } catch(e){
        console.log(e)
    }
}

export const {setIsLoadingTrue, setIsLoadingFalse, setAdRent, setFilterss} = rent.actions
export default rent.reducer