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
const obj = [
    {
        id:1,
        src: one
    },{
        id:2,
        src: two
    },{
        id:3,
        src: three
    },{
        id:4,
        src: four
    }
]


export const CardProduct = () => {
    return(
        <div className={styles.wrapper}>
            <Slider>
                <div className={cn(styles.item, styles.item1)}><img className={styles.image} src={one} /></div>
                <div className={cn(styles.item, styles.item2)}><img className={styles.image} src={two} /></div>
                <div className={cn(styles.item, styles.item3)}><img className={styles.image} src={three} /></div>
            </Slider>
            <div className={styles.discription}>
                <div className={styles.blockNamed}>
                    <span className={styles.nameProduct}>Клей пва, оптом</span>
                    <Icon className={styles.like} name='love' />
                </div>
                <span className={styles.price}>{formatMoney(5000)}</span>
                <span className={styles.located}>Екатринбург</span>
                <span className={styles.datePublication}>26 марта 11:57</span>
            </div>

        </div>
    )
}