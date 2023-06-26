import * as React from "react";
import styles from './CardAd.module.css'
import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {formatMoney} from "../../../../utils/formatMoney";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Icon} from "../../../../component/Icons/Icon";
import cn from 'classnames'


export interface ICardAd {
    id: string,
    description: string,
    photos: any,
    price: string,
    title: string,
    categoryId: string,
    city: string,
    deleteAd: (categoryId: string, id: string) => void
    upAd: (categoryId: string, id: string) => void
    user_id: string,
    isAuth: any,
    up: boolean
}

export const CardAd:FC<ICardAd> = ({user_id, deleteAd, upAd, id, description,photos,price,title, categoryId, city, isAuth, up}) => {

    const container = cn(styles.container, {
        [styles.upMode]: up === true && user_id === localStorage.getItem("user_id")
    })

    console.log(up)

    return(
        <div className={container} id={id}>
            <div className={styles.containerPhoto}>
                <img className={styles.images} src={photos ? photos[0]?.url : ''} />
            </div>
            <div className={styles.containerInfo}>
                <div className={styles.infoItems}>
                    <h3 className={styles.titleArea}>
                        <Link className={styles.title} to={`/item/${id}`}>{title}</Link>
                    </h3>
                    <div className={styles.priceArea}><span className={styles.price}>{formatMoney(price)}</span></div>
                    <div className={styles.locatedArea}><span className={styles.located}>{city}</span></div>
                    {up && user_id === localStorage.getItem("user_id") && <div className={styles.warning}>Promotion restante : 2 jours.</div>}
                </div>
            </div>
            {user_id === localStorage.getItem("user_id") && isAuth &&
                <div className={styles.buttonArea}>
                    {/*<div className={cn(styles.button, styles.delete)} onClick={() => deleteAd(categoryId, id)}>X</div>*/}
                    {/*{!up && <div className={cn(styles.button, styles.up)} onClick={() => upAd(categoryId, id)}>UP</div>}*/}
                    <Icon name='trash' className={cn(styles.button, styles.delete)} onClick={() => deleteAd(categoryId, id)} />
                    {!up && <Icon name='up' className={cn(styles.button, styles.up)} onClick={() => upAd(categoryId, id)} />}
                </div>

            }
        </div>
    )
}