import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from './Header.module.css'
import {ProfileArea} from "../ProfileArea/ProfileArea";
import {Icon} from "../Icons/Icon";
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getIsAuth, getIsLoading, getUserName} from "../../store/auth/userSelector";
import { Autorization } from "../../Pages/Autorization/Autorization";
import { FavoritesModal } from "../../Pages/FavoritesModal/FavoritesModal";
import { useEffect } from "react";


export const Header = ({ 
    toggleModal, 
    activeTab, 
    toggleActiveTab, 
    openModal, 
    closeModal,
    showFavoriteModal,
    showFavorites,
    orders,
    removeToFavoritesList}) => {

    //const [isLoading, setIsLoading] = useState(true)
    
    const isLoggedIn = useSelector(getIsAuth)
    const isLoading = useSelector(getIsLoading)

    // useEffect(() => {
    //     setIsLoading(false)
    // }, [isLoggedIn])


    const isName = localStorage.getItem('name')
return(
    <header className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link to="/about" style={{textDecoration: "none"}}><Button size='medium' mode='primary'><i class="bi bi-building"></i>About</Button></Link>
            </div>
                <div className={styles.rightSide}>
                <div className={styles.assistButton}>
                    <Icon className={cn(styles.button, styles.love)} name='love' onClick={showFavoriteModal}/>
                    {/* <Icon className={cn(styles.button, styles.cart)} name='cart' /> */}
                </div>
                {!isLoggedIn ?  <Button size='medium' mode='transparent' onClick={toggleModal} >{isLoading ? 'Loading...' : 'Вход и регистрация'}</Button> :  <ProfileArea userName={isName} />}
                <Button size='medium' mode='primary' icon='search'>Разместить объявление</Button>
            </div>
        </div>
        {showFavorites ? <FavoritesModal orders={orders} removeToFavoritesList={removeToFavoritesList}/> : null}
        <Autorization activeTab={activeTab} toggleActiveTab={toggleActiveTab} openModal={openModal} closeModal={closeModal} />
    </header>
)

}