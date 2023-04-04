import React from "react";
import styles from './Input.module.module.css'
import {Button} from "../Button/Button";
import cn from 'classnames'

export const Input = ({className, placeholder='Поиск по объявлениям'}) => {
    return(
        <div className={cn(styles.container, className)}>
            <div className={styles.area}>
                <input
                    className={styles.input}
                    type='text'
                    placeholder={placeholder}
                />
            </div>
            <Button className={styles.button}>Найти</Button>
        </div>

    )
}