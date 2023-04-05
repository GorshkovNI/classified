import React from "react";
import { Button } from "../Button/Button";
import styles from './Header.module.css'
import {ProfileArea} from "../ProfileArea/ProfileArea";
import {Icon} from "../Icons/Icon";
import cn from 'classnames'

export const Header = () => {

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
                <Button size='medium' mode='transparent'>Вход и регистрация</Button>
                <ProfileArea />
                <Button size='medium' mode='primary' icon='search'>Разместить объявление</Button>
            </div>
        </div>
    </header>
)

}