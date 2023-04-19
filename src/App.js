import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './component/Header/Header';
import {MainPages} from "./Pages/MainPages/MainPages";
import {SearchBlock} from "./component/SearchBlock/SearchBlock";
import React, {useEffect, useState} from "react";
import {Autorization} from "./Pages/Autorization/Autorization";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getIsLoading, getUserName} from "./store/userSelector";
import user, {checkAuth, logout} from "./store/user";
import UserService from "./service/UserService";
import { CardProduct } from './component/CardProduct/CardProduct';
import { ProductInfo } from './Pages/ProductInfo/ProductInfo';
import { Layout } from './component/Layout/Layout';


function App({store}) {

    
    const dispath = useDispatch()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'))
            dispath(checkAuth())
        }
    }, [])

    const getId = (e) => {

    }

  return (
    <BrowserRouter>
        <div className="App">
            {/* <MainPages /> */}
            <Routes>
                <Route path='/' element={<MainPages  />} />
                <Route path='/product-info/:id' element={<ProductInfo  />} />
            </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
