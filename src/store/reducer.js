import {combineReducers} from "@reduxjs/toolkit";
import user from "../store/auth/userSlice";

const reducer = combineReducers({
    user
})

export default reducer;