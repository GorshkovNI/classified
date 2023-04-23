import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {MainPages} from "./Pages/MainPages/MainPages";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import user, {checkAuth, logout} from "../src/store/auth/userSlice";
import { ProductInfo } from './Pages/ProductInfo/ProductInfo';
import { AddNewAds } from './Pages/AddNewAds/AddNewAds';


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
                <Route path='/product-info/:id' element={<ProductInfo  />} />
                <Route path='/additem' element={<AddNewAds />} />
            </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
