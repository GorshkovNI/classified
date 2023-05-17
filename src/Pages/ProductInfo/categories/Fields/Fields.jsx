import React from "react";
import styles from './Fields.module.css'
import {getFields} from "../../store/ProductInfoSelector";
import {useSelector} from "react-redux";


export const Fields = ({data}) => {

    const fields = useSelector(getFields)
    console.log('data ', data)
    console.log(fields)

    return(
        <ul className={styles.parametrsList}>
            {data.fields.map((field) => {
                return(
                    <li className={styles.itemUl}>
                        <span className={styles.item}>{field.placeholder}: </span>
                        {data.info[field.title]}
                    </li>
                )
            })}
                    {/*<li className={styles.itemUl}>*/}
                    {/*    <span className={styles.item}>Марка: </span>*/}
                    {/*    {data.marka}*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*    <span className={styles.item}>Модель: </span>*/}
                    {/*    {data.model}*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Год выпуска: </span>*/}
                    {/*    {data.year}*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Пробег: </span>*/}
                    {/*    {data.mileage} км*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Владельцев:  </span>*/}
                    {/*    {data.owners}*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Привод:  </span>*/}
                    {/*  Полный*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Комплектация:  </span>*/}
                    {/*  Базовая*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Тип кузова:  </span>*/}
                    {/*  Универсал*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>Цвет:  </span>*/}
                    {/*    {data.color}*/}
                    {/*</li>*/}
                    {/*<li className={styles.itemUl}>*/}
                    {/*  <span className={styles.item}>VIN или номер кузова:  </span>*/}
                    {/*    {data.vin}*/}
                    {/*</li>*/}
        </ul>
    )
}