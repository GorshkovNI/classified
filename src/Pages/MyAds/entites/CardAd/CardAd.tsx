import * as React from "react";
import styles from './CardAd.module.css'
import {FC} from "react";
import {Link} from "react-router-dom";
const logo = require('./logo.png')

export interface ICardAd {
    id: string,
    description: string,
    photos: string[],
    price: string,
    title: string
}

export const CardAd:FC<ICardAd> = ({id, description,photos,price,title}) => {
    return(
        <div className={styles.container} id={id}>
            <div className={styles.containerPhoto}>
                <img className={styles.images} src={photos[0]} />
            </div>
            <div className={styles.containerInfo}>
                <div className={styles.infoItems}>
                    <h3 className={styles.titleArea}>
                        <Link className={styles.title} to={'/'}>{title}</Link>
                    </h3>
                    <div className={styles.priceArea}><span className={styles.price}>{price}</span></div>
                    <div className={styles.locatedArea}><span className={styles.located}>Свердловская область, Екатеринбург, пл. 1905 года</span></div>
                </div>
            </div>
        </div>
    )
}