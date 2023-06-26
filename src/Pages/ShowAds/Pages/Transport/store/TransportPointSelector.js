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
        const filterTop = topAds(filterAd)
        return filterTop
    }
)

export const topAds = (array) => {
    const newArr = array.sort((a, b) => {
        if (a.up && !b.up) {
            return -1; // перемещаем объекты с полем "up: true" в начало
        } else if (!a.up && b.up) {
            return 1; // остальные объекты остаются в исходном порядке
        }
        return 0; // объекты без поля "up" или с одинаковыми значениями "up" остаются в исходном порядке
    });
    return newArr
}

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
        const parseDate = Number(date);
        if (!min && !max) return true;
        if (!min) return parseDate <= Number(max);
        if (!max) return parseDate >= Number(min);
        return parseDate >= Number(min) && parseDate <= Number(max);
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


