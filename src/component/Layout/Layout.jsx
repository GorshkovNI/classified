import React from "react";
import { Header } from "../Header/Header";
import { SearchBlock } from "../SearchBlock/SearchBlock";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const Layout = ({removeToFavoritesList,orders,showFavoriteModal,showFavorites,children, isSearchBlock = true}) => {

    const [isOpenSignUp, setIsOpenSignUp] = useState(false)
    const [activeTab, setActiveTab] = useState('login')
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

    return(
        <div>
            <Header 
            toggleModal={toggleModal} 
            activeTab={activeTab} 
            toggleActiveTab={toggleActiveTab} 
            openModal={isOpenSignUp} 
            closeModal={closeModal} 
            showFavoriteModal = {showFavoriteModal}
            showFavorites = {showFavorites}
            orders={orders}
            removeToFavoritesList = {removeToFavoritesList}/>
            {isSearchBlock && <SearchBlock  />}
            {children}
        </div>
    )
}