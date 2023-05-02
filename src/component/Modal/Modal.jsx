import React, {useRef} from 'react';
import styles from './Modal.module.css'
import {Icon} from "../Icons/Icon";

export const Modal = ({isOpen, onClose, children, turnOff = false}) => {

    const handleOverlayClick = (event) => {
        if(event.target.classList.contains([styles.overlay])){
            onClose()
        }
    }

    if(!isOpen) return null

    return (
        <div className={styles.modal} >
            <div className={styles.overlay} onClick={turnOff ? () => {} : handleOverlayClick}>
                <div className={styles.content}>
                    {turnOff ? null : <Icon className={styles.closeButton} onClick={onClose} name='close' />}
                    {/*<button className={styles.closeButton} onClick={onClose}>X</button>*/}
                    {children}
                </div>
            </div>
        </div>
    );
};
