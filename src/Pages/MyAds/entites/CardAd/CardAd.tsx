import * as React from "react";
import styles from './CardAd.module.css'
import {FC} from "react";
import {Link} from "react-router-dom";
import {formatMoney} from "../../../../utils/formatMoney";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {deleteAd} from "../../store/userProfileSlice";
const logo = require('./logo.png')

export interface ICardAd {
    id: string,
    description: string,
    photos: string[],
    price: string,
    title: string,
    categoryId: string
}

type DispatchType = ThunkDispatch<any, any, any>;

export const CardAd:FC<ICardAd> = ({id, description,photos,price,title, categoryId}) => {
    console.log(id)

    const dispatch: DispatchType = useDispatch()

    const handleDelete = () => {
        dispatch(deleteAd(categoryId, id))
    }

    return(
        <div className={styles.container} id={id}>
            <div className={styles.containerPhoto}>
                <img className={styles.images} src={photos[0]} />
            </div>
            <div className={styles.containerInfo}>
                <div className={styles.infoItems}>
                    <h3 className={styles.titleArea}>
                        <Link className={styles.title} to={`/ad/${id}`}>{title}</Link>
                    </h3>
                    <div className={styles.priceArea}><span className={styles.price}>{formatMoney(price)}</span></div>
                    <div className={styles.locatedArea}><span className={styles.located}>Свердловская область, Екатеринбург, пл. 1905 года</span></div>
                </div>
            </div>
            <div onClick={handleDelete}>X</div>
        </div>
    )
}