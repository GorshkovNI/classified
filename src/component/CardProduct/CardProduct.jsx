import React from "react";
import styles from './CardProduct.module.css'
import { Slider } from "../Slider/Slider";
import cn from "classnames";
import { formatMoney } from "../../utils/formatMoney";
import { useSelector } from "react-redux";
import one from './1.jpg'
import two from './2.jpg'
import three from './3.jpg'
import four from './4.jpg'
import { Icon } from "../Icons/Icon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MainPages } from "../../Pages/MainPages/MainPages";
import { setFavorites,toggleFavorites } from "../../store/favorites/favoritesSlice";
import { useDispatch } from "react-redux";

export const CardProduct = ({ id , title , city, price, date, photos }) => {
    console.log(id)
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.favorites.orders);
    const removeFavorites = () =>dispatch(removeFavorites(id));
    const photo = photos.length > 0 ? photos[0].url : ''
    const addToFavoritesList = () =>dispatch(setFavorites({id, title, price, city, photo}));
    return (
        <div className={styles.wrapper}  >
            {/*<Link to={`/product-info/${id}`} className={styles.link}>*/}
            {photos.length > 0 &&  <Slider>
                    {photos.map((photo) => {
                         return <div className={cn(styles.item, styles.item1)}><img className={styles.image} src={photo.url} /></div>
                    })}
                </Slider>}
            {/*</Link>*/}
            <div className={styles.discription}>
                <div className={styles.blockNamed}>
                    <Link to={`/item/${id}`} className={styles.link}>
                        <span className={styles.nameProduct}>{title} </span>
                    </Link>
                    {
                        !(orders.some(element => element.id === id)) ? <i  id = {id} className="bi bi-heart" style={{fontSize: '21px', color: '#009CF0'}} onClick={()=>{addToFavoritesList({id,title,price, city, photo})}}></i>
                        : <i id = {id} className="bi bi-heart-fill" style={{fontSize: '21px', color: 'red'}} onClick={()=>{addToFavoritesList({id,title,price})}}></i>
                    }
                </div>
                <span className={styles.price}>{formatMoney(price)}</span>
                <span className={styles.located}>{city} </span>
                <span className={styles.datePublication}>{date} </span>
            </div>

        </div>


    )
}
