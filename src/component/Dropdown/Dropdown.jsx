import React from 'react';
import styles from './Dropdown.module.css'
import cn from 'classnames'

export const Dropdown = ({className, children}) => {
    return (
        <div className={cn(styles.dropdown, className)}>
            <div className={styles.list}>
                <div className={styles.item}>
                    {children}
                </div>
            </div>
        </div>
    );
};
