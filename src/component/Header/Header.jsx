import React from "react";
import { Button } from "../Button/Button";
import styles from './Header.module.css'

export const Header = () => {


return(
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Button>123</Button>
            </div>
            <div className={styles.rightSide}>
                <Button size='medium' mode='transparent'>Вход и регистрация</Button>
                <Button size='medium' mode='primary' icon='search'>Разместить объявление</Button>
            </div>
        </div>
    </div>
)

}