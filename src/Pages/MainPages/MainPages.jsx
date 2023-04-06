import React, {useEffect} from "react";
import styles from './MainPages.module.css'
import cn from 'classnames'
import {Input} from "../../component/Input/Input";
import {Icon} from "../../component/Icons/Icon";
import {CardProduct} from "../../component/CardProduct/CardProduct";

export const MainPages = ({className}) => {


    useEffect(() => {
        fetch('http://localhost:8080/api/user/3')
            .then(res=>res.json())
            .then(data=> console.log(data))
            .catch(error => {console.log('Пользователь не найден')})
    }, [])

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h3>Рекомендации для вас</h3>
            </div>
            <div className={styles.productArea}>
                <div className={styles.products}>
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                </div>
                <div className={styles.infoArea}></div>
            </div>

        </div>
    )
}
