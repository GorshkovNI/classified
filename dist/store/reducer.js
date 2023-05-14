import { combineReducers } from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";
import userAd from "../Pages/MyAds/store/userProfileSlice";
import product from "../Pages/ProductInfo/store/ProductInfoSlice";
var reducer = combineReducers({
    user: user,
    ad: ad,
    userAd: userAd,
    product: product
});
export default reducer;
