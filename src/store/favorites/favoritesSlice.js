import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    isFavorites: false
}

const favorites = createSlice({
    name: 'favoriteSlice',
    initialState,
    reducers:{
        setFavorites: (state,action)=> {
            console.log(action.payload)
            const items = action.payload
            current(state.orders).some(element => element.id === items.id) 
            ? state.orders = state.orders.filter(el => el.id !== items.id) 
            : state.orders = [...state.orders, items]
            
        },
        removeFavorites(state,action){
            const id = action.payload
            state.orders = state.orders.filter(el => el.id !== id)
            
        },
    }
})
export const {setFavorites,removeFavorites,toggleFavorites} = favorites.actions
export default favorites.reducer