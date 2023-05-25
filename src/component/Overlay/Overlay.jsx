import React from "react";
import styles from "./Overlay.module.css"


export const Overlay = ({children, closeOverlay}) => {



    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.close} onClick={closeOverlay}>X</div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}