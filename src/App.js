import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './component/Header/Header';
import {MainPages} from "./Pages/MainPages/MainPages";
import {SearchBlock} from "./component/SearchBlock/SearchBlock";
import React, {useEffect, useState} from "react";
import {Autorization} from "./Pages/Autorization/Autorization";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getIsLoading} from "./store/userSelector";
import user, {checkAuth, logout} from "./store/user";
import UserService from "./service/UserService";


function App({store}) {

    const [isOpenSignUp, setIsOpenSignUp] = useState(false)
    const [activeTab, setActiveTab] = useState('login')
    const [users, setUsers] = useState([])
    const dispath = useDispatch()

    const toggleActiveTab = (active) => {
        setActiveTab(active)
    }

    const toggleModal = () => {
        setIsOpenSignUp(!isOpenSignUp)
        document.body.classList.add("modal-open");
    }

    const closeModal = () =>{
        setIsOpenSignUp(false)
        document.body.classList.remove("modal-open");
    }

    const tempCheck = async () => {
        dispath(logout())
    }

    const check = useSelector(getIsAuth)
    const isLoading = useSelector(getIsLoading)

    useEffect(()=>{
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'))
            dispath(checkAuth())
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUser();
            console.log(response)
            setUsers(response.data)
        }
        catch (e){

        }
    }

  return (
    <BrowserRouter>
        <div className="App">
            <Header toggleModal={toggleModal} />
            <SearchBlock />
            <MainPages />
            {isLoading ? <h1>Проверка авторизации</h1> : ''}
            <h1>{check ? 'Вы авторизованы': 'Авторизуйтесь'}</h1>
            {check ?
                <div>
                    <button onClick={tempCheck}>Выйти</button>
                    <button onClick={getUsers}>Получить пользователей</button>
                </div>

                : ''}
            <button onClick={ () => console.log(check)}>Проверка</button>
            {users.length !== 0 ?
                <div>
                    {users.map((user) => {
                        return (
                            <div>{user.email}</div>
                        )
                    })}
                </div> : ''}
            <Routes>
                {/*<Route path='/' element={<MainPages />} />*/}
                <Route path='/auth' element={<Autorization activeTab={activeTab} toggleActiveTab={toggleActiveTab} openModal={isOpenSignUp} closeModal={closeModal} />} />
            </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
