import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";
import userAd from "../Pages/MyAds/store/userProfileSlice"
import product from "../Pages/ProductInfo/store/ProductInfoSlice"
import favorites from "./favorites/favoritesSlice";
import search from "../component/SearchBlock/store/searchSlice"
import mainPage from "../Pages/MainPages/store/MainPageSlice"
import transport from '../Pages/ShowAds/Pages/Transport/store/TransportPointSlice'
import rent from '../Pages/ShowAds/Pages/Rent/store/RentPointSlice'

const reducer = combineReducers({
    user,
    ad,
    userAd,
    product,
    favorites,
    search,
    mainPage,
    transport,
    rent
})

export default reducer;