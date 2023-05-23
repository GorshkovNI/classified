import React from 'react'
import styles from './ChooseCategories.module.css'

export const ChooseCategories = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.categoriesContainer}>
                <div className={styles.categoryColumn}>
                    <div className={styles.categoryItem}>
                        <div className={styles.link} id='car'>Transport</div>
                    </div>
                    <div className={styles.categoryItem}>
                        <div className={styles.link} id='work'>Emploi</div>
                    </div>
                    <div className={styles.categoryItem}>
                        <div className={styles.link} id='rent'>Immobilier</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
