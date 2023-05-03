import * as React from "react";
import styles from './ProfileInfo.module.css'
import {FC, useState} from "react";


interface IProfileInfo {
    id: string
}

export const ProfileInfo:FC<IProfileInfo> = ({id= '1'}) => {

    const [photo, setPhoto] = useState<string>('')


    return(
        <div className={styles.container} >
            <div className={styles.avatarArea}>
                {photo ? <img src={photo} /> : <div className={styles.secondAvatar}>A</div>}
            </div>
            <div className={styles.name}>Антон</div>
        </div>
    )
}
