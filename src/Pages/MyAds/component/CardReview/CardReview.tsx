import * as React from "react";
import {FC, useEffect, useState} from "react";
import styles from './CardReview.module.css'
import {Rating} from "../../../../component/Raiting/Raiting";



interface ICardReview{
    adObj:{
        idAd: string,
        title: string,
        photo: string,
        rating: number,
        text: string
    },
    getId: (event) => void
}

export const CardReview:FC<ICardReview> = ({adObj, getId}) => {
    console.log('adObj ', adObj.idAd)
    return(
        <div className={styles.container} id={adObj.idAd} onClick={getId}>
            <div className={styles.photoArea}>
                <img className={styles.photo} src={adObj.photo} />
            </div>
            <div className={styles.title}>
                <span>{adObj.title}</span>
                {adObj.rating && <Rating rating={adObj.rating} onRatingSelected={() => {}} />}
                {adObj.text && <div>{adObj.text}</div>}
            </div>
        </div>
    )
}