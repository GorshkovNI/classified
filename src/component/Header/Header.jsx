import React from "react";
import { Button } from "../Button/Button";
import styles from './Header.module.css'
import {ProfileArea} from "../ProfileArea/ProfileArea";
import {Icon} from "../Icons/Icon";
import cn from 'classnames'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getIsAuth, getUserName} from "../../store/auth/userSelector";
import { Autorization } from "../../Pages/Autorization/Autorization";

export const Header = ({toggleModal, activeTab, toggleActiveTab, openModal, closeModal}) => {

const isLoggedIn = useSelector(getIsAuth);
const isName = localStorage.getItem('name')


return(
    <header className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Button>123</Button>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.assistButton}>
                    <Icon className={cn(styles.button, styles.love)} name='love' />
                    <Icon className={cn(styles.button, styles.cart)} name='cart' />
                </div>
                {!isName ? !isLoggedIn && <Button size='medium' mode='transparent' onClick={toggleModal} >Вход и регистрация</Button> : <ProfileArea userName={isName} />}
                <Button size='medium' mode='primary' icon='search'>Разместить объявление</Button>
            </div>
        </div>
        <Autorization activeTab={activeTab} toggleActiveTab={toggleActiveTab} openModal={openModal} closeModal={closeModal} />
    </header>
)

}