import React from "react";
import styles from './ProfileArea.module.css'
import {Icon} from "../Icons/Icon";

export const ProfileArea = () => {
    return(
        <div className={styles.wrapper}>
            <img className={styles.userIcon}  />
            <span className={styles.userName}>Nikita</span>
            <Icon className={styles.arrow} name='arrow' />
        </div>
    )
}