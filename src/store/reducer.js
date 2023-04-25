import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";
import ad from "../store/ad/adSlice";

const reducer = combineReducers({
    user,
    ad
})

export default reducer;