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

export const CardProduct = ({ id = '3645', title = 'Penis', city = 'Екатеринбург', price = '', date }) => {
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.favorites.orders);
    const removeFavorites = () =>dispatch(removeFavorites(id));
    const addToFavoritesList = () =>dispatch(setFavorites({id, title, price}));
    return (
        <div className={styles.wrapper}  >
            <Link to={`/product-info/${id}`} className={styles.link}>
                <Slider>
                    <div key={1} className={cn(styles.item, styles.item1)}><img className={styles.image} src={one} /></div>
                    <div key={2}  className={cn(styles.item, styles.item2)}><img className={styles.image} src={two} /></div>
                    <div key={3} className={cn(styles.item, styles.item3)}><img className={styles.image} src={three} /></div>
                </Slider>
            </Link>
            <div className={styles.discription}>
                <div className={styles.blockNamed}>
                    <Link to={`/product-info/${id}`} className={styles.link}>
                        <span className={styles.nameProduct}>{title || 'Клей пва, оптом'} </span>
                    </Link>
                    {
                        !(orders.some(element => element.id === id)) ? <i  id = {id} className="bi bi-heart" style={{fontSize: '21px', color: '#009CF0'}} onClick={()=>{addToFavoritesList({id,title,price})}}></i>
                        : <i id = {id} className="bi bi-heart-fill" style={{fontSize: '21px', color: 'red'}} onClick={()=>{addToFavoritesList({id,title,price})}}></i>
                    }
                </div>
                <span className={styles.price}>{formatMoney(5000) || formatMoney(price)}</span>
                <span className={styles.located}>{city || 'Екатеринбург'} </span>
                <span className={styles.datePublication}>{date || '26 марта 11:57'} </span>
            </div>

        </div>


    )
}