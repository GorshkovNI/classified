import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";
import userAd from "../Pages/MyAds/store/userProfileSlice"

const reducer = combineReducers({
    user,
    ad,
    userAd
})

export default reducer;