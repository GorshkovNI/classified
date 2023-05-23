import {createSelector} from "@reduxjs/toolkit";

export const getSearch = (state) => state.search
export const getAllAds = (state) => state.search.ads
export const getPriceTo = (state) => state.search.priceTo
export const getPriceFrom = (state) => state.search.priceFrom
export const getIsLoading = (state) => state.search.isSearchLoading

export const getAdWithFilter = createSelector(
    [
        getSearch,
    ],

    ({ads, priceTo,priceFrom}) => {
        console.log(ads, Number(priceTo),Number(priceFrom))
        const sumFilterAd = filterAds(ads, Number(priceTo), Number(priceFrom));
        return sumFilterAd
    }
)

const intervalSum = (min, max) => {
    return (value) => {
        const sum = Number(value.replaceAll(' ', ''))
        const sumTo = min ? min : 0
        const sumFrom = max ? max : Infinity
        console.log(sum >= sumTo && sum <= sumFrom)
        return sum >= sumTo && sum <= sumFrom
    }
}

const filterAds = (search, priceTo, priceFrom) => {

    const sumFilter = intervalSum(priceTo, priceFrom)

    return search?.filter(({price}) => {
        return[
            sumFilter(price)
        ].every(Boolean)
    })
}