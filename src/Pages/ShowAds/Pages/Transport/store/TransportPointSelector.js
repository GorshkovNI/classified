import {createSelector} from "@reduxjs/toolkit";
import {getSearch} from "../../../../../component/SearchBlock/store/searchSelector";

export const getTransport = (state) => state.transport
export const getAllAds = (state) => state.transport.ads
export const getFilters = (state) => state.transport.filters

export const getFilterAd = createSelector(
    [
        getTransport, getAllAds, getFilters
    ],

    ({ads, filters}) => {
        console.log(ads, filters)
        const filterAd = filterAds(ads, filters)
        return filterAd
    }
)

const findMark = (marka) => {
    return (value) => {
        if(!marka){
            return value
        }
        return marka === value

    }
}

const findModel = (model) => {
    return (value) => {
        if(!model){
            return value
        }
        return model === value
    }
}

const intervalDate = (min, max) => {
    return (date) => {
        if (!date) return null;
        const parseDate = Date.parse(date);
        if (!min && !max) return true;
        if (!min) return parseDate <= max;
        if (!max) return parseDate >= min;
        return parseDate >= min && parseDate <= max;
    };
};

const filterAds = (ads, filters) => {
    const filterMark = findMark(filters.marka)
    const filterModel = findModel(filters.model)
    const filterDate = intervalDate(filters.yearFrom, filters.yearTo)
    console.log('filterMark ', filters.marka)
    return ads?.filter(({marka, model, year}) => {
        console.log(marka)
        return[
            filterMark(marka),
            filterModel(model),
            filterDate(year)
        ].every(Boolean)
    })
}


