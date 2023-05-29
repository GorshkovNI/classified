import {createSelector} from "@reduxjs/toolkit";

export const getAllRent = (state) => state.rent
export const getLoading = (state) => state.rent.isLoading

export const getFilterAd = createSelector(
    [
        getAllRent
    ],

    ({ads, filters}) => {
        console.log(ads, filters)
        const filterAd = filterAds(ads, filters)
        return filterAd

    }
)

const squareFiltres = (min, max) => {
    return (value) => {
        const squareTo = min == 0 ? 0 : min
        const squareFrom = max == 0? Infinity : max
        return value >= squareTo && value <= squareFrom;
    }
}

const squareKitchenFiltres = (min, max) => {
    return (value) => {
        const squareTo = min == 0 ? 0 : min
        const squareFrom = max == 0? Infinity : max
        return value >= squareTo && value <= squareFrom;
    }
}

const floorFiltres = (min, max) => {
    return (value) => {
        const floorTo = min == 0 ? 0 : min
        const floorFrom = max == 0? Infinity : max
        return value >= floorTo && value <= floorFrom;
    }
}

const tolFilter = (tol) => {
    return (value) => {
        console.log(value, tol)
         if(tol == value){
             return value
         }
    }
}

const filterAds = (ads, filters) => {
    const filterSquare = squareFiltres(filters.squareTo, filters.squareFrom)
    const filterSquareKitchen = squareKitchenFiltres(filters.squareKitchenTo, filters.squareKitchenFrom)
    const filterFloor = floorFiltres(filters.floorTo, filters.floorFrom)
    const filterTol = tolFilter(filters.bathroom)
    return ads?.filter(({square, floor, squareKitchen, bathroom}) => {

        return[
            filterSquare(square),
            filterSquareKitchen(squareKitchen),
            filterFloor(floor),
            filterTol(bathroom)
        ].every(Boolean)
    })
}

