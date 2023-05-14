import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";
import favorites from "./favorites/favoritesSlice";
const reducer = combineReducers({
    user,
    ad,
    favorites
})

export default reducer;