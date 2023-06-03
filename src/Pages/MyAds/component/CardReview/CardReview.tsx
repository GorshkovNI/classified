import * as React from "react";
import {FC, useEffect, useState} from "react";
import styles from './CardReview.module.css'
import {Rating} from "../../../../component/Raiting/Raiting";



interface ICardReview{
    adObj:{
        idAd: string,
        id?: string,
        title: string,
        photo?: string,
        rating: number,
        text?: string,
        city?: string
    },
    getId: (event) => void
}

export const CardReview:FC<ICardReview> = ({adObj, getId}) => {

    const id = adObj.idAd ? adObj.idAd : adObj.id
    console.log('adObj ', adObj.id)
    return(
        <div className={styles.container} id={id} onClick={getId}>
            <div className={styles.photoArea}>
                <img className={styles.photo} src={adObj.photo} />
            </div>
            <div className={styles.title}>
                <span className={styles.titleSpan}>{adObj.title}</span>
                {adObj.rating && <Rating rating={adObj.rating} onRatingSelected={() => {}} />}
                {adObj.text && <div>{adObj.text}</div>}
                {adObj.city && <div>{adObj.city}</div>}

            </div>
        </div>
    )
}