import {configureStore, applyMiddleware} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {logger} from "redux-logger/src";
import reducer from "./reducer";

export const store = configureStore({
    reducer,
    middleware:[thunkMiddleware]
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
})