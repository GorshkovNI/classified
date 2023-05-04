import * as React from "react";
import styles from './ProfileInfo.module.css'
import {FC, useState} from "react";


interface IProfileInfo {
    id: string,
    name: string
}

export const ProfileInfo:FC<IProfileInfo> = ({id= '1', name}) => {

    const [photo, setPhoto] = useState<string>('')


    return(
        <div className={styles.container} >
            <div className={styles.avatarArea}>
                {photo ? <img src={photo} /> : <div className={styles.secondAvatar}>{name[0]}</div>}
            </div>
            <div className={styles.name}>{name}</div>
        </div>
    )
}
