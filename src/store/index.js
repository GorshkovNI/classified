import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

import {logger} from "redux-logger/src";
import {loginReducer} from "./login/sliceLogin";
import reducer from "./login/reducer";

export const store = configureStore({
    reducer: reducer,
   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
})