import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";
import userAd from "../Pages/MyAds/store/userProfileSlice"
import product from "../Pages/ProductInfo/store/ProductInfoSlice"

const reducer = combineReducers({
    user,
    ad,
    userAd,
    product
})

export default reducer;