import * as React from "react";
import styles from './CardAd.module.css'
import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {formatMoney} from "../../../../utils/formatMoney";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";


export interface ICardAd {
    id: string,
    description: string,
    photos: any,
    price: string,
    title: string,
    categoryId: string,
    city: string,
    deleteAd: (categoryId: string, id: string) => void
    user_id: string,
    isAuth: any
}

export const CardAd:FC<ICardAd> = ({user_id, deleteAd, id, description,photos,price,title, categoryId, city, isAuth}) => {

    return(
        <div className={styles.container} id={id}>
            <div className={styles.containerPhoto}>
                <img className={styles.images} src={photos[0].url} />
            </div>
            <div className={styles.containerInfo}>
                <div className={styles.infoItems}>
                    <h3 className={styles.titleArea}>
                        <Link className={styles.title} to={`/ad/${id}`}>{title}</Link>
                    </h3>
                    <div className={styles.priceArea}><span className={styles.price}>{formatMoney(price)}</span></div>
                    <div className={styles.locatedArea}><span className={styles.located}>{city}</span></div>
                </div>
            </div>
            {user_id === localStorage.getItem("user_id") && isAuth && <div className={styles.delete} onClick={() => deleteAd(categoryId, id)}>X</div>}
        </div>
    )
}