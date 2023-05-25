import * as React from "react";
import {FC, useEffect, useState} from "react";
import styles from './Card.module.css'
import {Rating} from "../../../component/Raiting/Raiting";


interface ICard{
    adObj:{
        id: string,
        title: string,
        photo: string
    },
    getId: (event) => void
}

export const Card:FC<ICard> = ({adObj, getId}) => {
    console.log('adObj ', adObj.id)
    return(
        <div className={styles.container} id={adObj.id} onClick={getId}>
            <div className={styles.photoArea}>
                <img className={styles.photo} src={adObj.photo} />
            </div>
            <div className={styles.title}>
                <span>{adObj.title}</span>
            </div>
        </div>
    )
}