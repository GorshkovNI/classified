import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";
import userAd from "../Pages/MyAds/store/userProfileSlice"
import product from "../Pages/ProductInfo/store/ProductInfoSlice"
import favorites from "./favorites/favoritesSlice";
import search from "../component/SearchBlock/store/searchSlice"

const reducer = combineReducers({
    user,
    ad,
    userAd,
    product,
    favorites,
    search
})

export default reducer;