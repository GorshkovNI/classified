import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {MainPages} from "./Pages/MainPages/MainPages";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import user, {checkAuth, logout} from "../src/store/auth/userSlice";
import { AddNewAds } from '../src/Pages/AddNewAds/AddNewAds';
import {UserAds} from "./Pages/MyAds/UserAds";
import {ProductInfo} from "./Pages/ProductInfo/ProductInfo";


function App({store}) {

    const dispath = useDispatch()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'))
            dispath(checkAuth())
        }
    }, [])


  return (
    <BrowserRouter>
        <div className="App">
            {/* <MainPages /> */}
            <Routes>
                <Route path='/' element={<MainPages  />} />
                <Route path='/ad/:id' element={<ProductInfo  />} />
                <Route path='/additem' element={<AddNewAds />} />
                <Route path='/profile/:id' element={<UserAds />} />
            </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
