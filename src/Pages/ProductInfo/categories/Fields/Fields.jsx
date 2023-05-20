import React from "react";
import styles from './Fields.module.css'
import {getFields} from "../../store/ProductInfoSelector";
import {useSelector} from "react-redux";


export const Fields = ({data, mode='standart'}) => {

    const fields = useSelector(getFields)
    console.log('data ', data)
    console.log(fields)

    return(
        <>
            <ul className={styles.parametrsList}>
                {data.fields.map((field) => {
                    return(
                        <li className={styles.itemUl}>
                            <span className={styles.item}>{field.placeholder} : </span>
                            {mode=='edit' ? <input value1={data.info[field.title]} /> : <>{data.info[field.title]}</>}

                        </li>
                    )
                })}

            </ul>
            {mode=='edit' && <button>Сохранить</button>}
        </>

    )
}