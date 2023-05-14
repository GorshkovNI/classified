import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPages } from "./Pages/MainPages/MainPages";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user, { checkAuth, logout } from "../src/store/auth/userSlice";
import { AddNewAds } from '../src/Pages/AddNewAds/AddNewAds';
import { UserAds } from "./Pages/MyAds/UserAds";
import { ProductInfo } from "./Pages/ProductInfo/ProductInfo";
function App(_a) {
    var store = _a.store;
    var dispath = useDispatch();
    useEffect(function () {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            dispath(checkAuth());
        }
    }, []);
    return (React.createElement(BrowserRouter, null,
        React.createElement("div", { className: "App" },
            React.createElement(Routes, null,
                React.createElement(Route, { path: '/', element: React.createElement(MainPages, null) }),
                React.createElement(Route, { path: '/ad/:id', element: React.createElement(ProductInfo, null) }),
                React.createElement(Route, { path: '/additem', element: React.createElement(AddNewAds, null) }),
                React.createElement(Route, { path: '/profile/:id', element: React.createElement(UserAds, null) })))));
}
export default App;
