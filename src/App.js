import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {MainPages} from "./Pages/MainPages/MainPages";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import user, {checkAuth, logout} from "../src/store/auth/userSlice";
import { AddNewAds } from '../src/Pages/AddNewAds/AddNewAds';
import {UserAds} from "./Pages/MyAds/UserAds";
import {ProductInfo} from "./Pages/ProductInfo/ProductInfo";
import {ReviewUser} from "./Pages/ReviewUser/ReviewUser";
import {ShowAds} from "./Pages/ShowAds/ShowAds";
import {About} from "./Pages/About/About";
import {Feedback} from "./Pages/Feedback/Feedback";

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
                <Route path='/review/:id' element={<ReviewUser />} />
                <Route path='/showReview/:id' element={<ReviewUser />} />
                <Route path='/search' element={<ShowAds />} />
                <Route path='/about' element={<About/>}/>
                <Route path='/feedback' element={<Feedback/>}/>

            </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
