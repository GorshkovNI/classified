import React from 'react'
import styles from './Categories.module.css'

export const Categories = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.categoriesContainer}>
                <div className={styles.categoryColumn}>
                    <div className={styles.categoryItem}>
                        <a className={styles.link} href="/transport">Транспорт</a>
                    </div>
                    <div className={styles.categoryItem}>
                        <a className={styles.link} href="/work">Работа</a>
                    </div>
                    <div className={styles.categoryItem}>
                        <a className={styles.link} href="/housing">Недвижимость</a>
                    </div>
                </div>

                <div className={styles.categoryColumn}>
                    <div className={styles.categoryItem}></div>
                    <div className={styles.categoryItem}></div>
                    <div className={styles.categoryItem}></div>
                </div>
            </div>
        </div>
    )
}
