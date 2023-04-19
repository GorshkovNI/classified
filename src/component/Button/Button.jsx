import React from "react";
import { Icon } from "../Icons/Icon";
import styles from './Button.module.css'
import cn from 'classnames'

const buttonTypes = {
    primary: 'primary',
    transparent: 'transparent',
    outlined: 'outlined',
    contained: 'contained'
}

export const Button = ({size, mode='primary', type, onClick, children, className, ...props}) => {

    const buttonClassName = cn(styles.button, {
        [styles.primary]: mode === buttonTypes.primary,
        [styles.transparent]: mode === buttonTypes.transparent,
        [styles.outlined]: mode === buttonTypes.outlined,
        [styles.contained]: mode === buttonTypes.contained,
        

        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small'
    },
    className)

    return(
        <button className={buttonClassName} onClick={onClick} type={type}>
            <Icon name={props.icon} className={cn(styles.buttonIcon, props.classNameIcon)} />
            {children}
        </button>
    )
}