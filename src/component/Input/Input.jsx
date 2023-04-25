import React from "react";
import styles from './Input.module.module.css'
import {Button} from "../Button/Button";
import cn from 'classnames'

export const Input = ({className, placeholder, name, type = 'text', id, value, onChange, button, buttonText, incorrect}) => {

    const inputClassname = cn(styles.container, className,{
        [styles.incorrect]: incorrect
    })

    return(
        <div className={inputClassname}>
            <div className={styles.area}>
                <input
                    className={styles.input}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    id={id}
                    name={name}
                />
            </div>
            <div className={styles.buttonArea}>
                {button && <Button mode='transparent' className={styles.button}>{buttonText}</Button>}
            </div>
            
        </div>

    )
}