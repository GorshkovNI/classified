import React from "react";
import styles from './CardProduct.module.css'
import {Slider} from "../Slider/Slider";
import cn from "classnames";
import {formatMoney} from "../../utils/formatMoney";

import one from './1.jpg'
import two from './2.jpg'
import three from './3.jpg'
import four from './4.jpg'
import {Icon} from "../Icons/Icon";
import { Link } from "react-router-dom";


export const CardProduct = ({id = '3645', onClick, title, city, price, date }) => {
    return(
        <Link to={`/product-info/${id}`} className={styles.link}>
            <div className={styles.wrapper}  >
                <Slider>
                    <div className={cn(styles.item, styles.item1)}><img className={styles.image} src={one} /></div>
                    <div className={cn(styles.item, styles.item2)}><img className={styles.image} src={two} /></div>
                    <div className={cn(styles.item, styles.item3)}><img className={styles.image} src={three} /></div>
                </Slider>
                <div className={styles.discription}>
                    <div className={styles.blockNamed}>
                        <span className={styles.nameProduct}>{title || 'Клей пва, оптом'} </span>
                        <Icon className={styles.like} name='love' />
                    </div>
                    <span className={styles.price}>{formatMoney(5000) || formatMoney(price)}</span>
                    <span className={styles.located}>{city || 'Екатринбург'} </span>
                    <span className={styles.datePublication}>{date || '26 марта 11:57'} </span>
                </div>

            </div>
        </Link>
        
    )
}