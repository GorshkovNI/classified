import React, {useEffect} from "react";
import styles from './MainPages.module.css'
import cn from 'classnames'
import {Input} from "../../component/Input/Input";
import {Icon} from "../../component/Icons/Icon";
import {CardProduct} from "../../component/CardProduct/CardProduct";


export const MainPages = ({className}) => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h3>Рекомендации для вас</h3>
            </div>
            <div className={styles.productArea}>
                <div className={styles.products}>
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                    {/*<CardProduct />*/}
                </div>
                <div className={styles.infoArea}></div>
            </div>

        </div>
    )
}
