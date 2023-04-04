import React from "react";
import { Icon } from "../Icons/Icon";
import styles from './Button.module.css'
import cn from 'classnames'

const buttonTypes = {
    primary: 'primary',
    transparent: 'transparent'
}

export const Button = ({size, mode='primary', children, ...props}) => {

    const buttonClassName = cn(styles.button, {
        [styles.primary]: mode === buttonTypes.primary,
        [styles.transparent]: mode === buttonTypes.transparent,
        

        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small'
    },
    props.className)

    return(
        <button className={buttonClassName} onClick={props.onClick}>
            <Icon name={props.icon} className={styles.buttonIcon} />
            {children}
        </button>
    )
}