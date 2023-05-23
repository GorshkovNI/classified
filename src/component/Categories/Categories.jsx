import React from 'react'
import styles from './Categories.module.css'

export const Categories = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.categoriesContainer}>
                <div className={styles.categoryColumn}>
                    <div className={styles.categoryItem}>
                        <a className={styles.link} href="/transport">Transport</a>
                    </div>
                    <div className={styles.categoryItem}>
                        <a className={styles.link} href="/work">Emploi</a>
                    </div>
                    <div className={styles.categoryItem}>
                        <a className={styles.link} href="/housing">Immobilier</a>
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
