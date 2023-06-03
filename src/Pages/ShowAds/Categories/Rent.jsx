import React from "react";
import styles from "./Rent.module.css";

export const Rent = ({squareFrom, handleSquareKitchenFrom, handleSquareKitchenTo, handleFloorFrom, handleSquareTo, floorFrom, floorTo, handleFloorTo, handleSquareFrom, squareTo, squareKitchenFrom, squareKitchenTo}) => {
    return(
        <div className={styles.container}>
            <h4 className={styles.title}>Carré</h4>
            <div className={styles.squareBlock}>
                <input placeholder='Depuis' type='number' className={styles.input} value={squareFrom} onChange={handleSquareFrom} />
                <input placeholder='Avant' type='number' className={styles.input} value={squareTo} onChange={handleSquareTo} />
            </div>
            <h4 className={styles.title}>Carré cuisine</h4>
            <div className={styles.squareBlock}>
                <input placeholder='Depuis' type='number' className={styles.input} value={squareKitchenFrom} onChange={handleSquareKitchenFrom} />
                <input placeholder='Avant' type='number' className={styles.input} value={squareKitchenTo} onChange={handleSquareKitchenTo} />
            </div>
            <h4 className={styles.title}>Sol</h4>
            <div className={styles.squareBlock}>
                <input placeholder='Depuis' type='number' className={styles.input} value={floorFrom} onChange={handleFloorFrom} />
                <input placeholder='Avant' type='number' className={styles.input} value={floorTo} onChange={handleFloorTo} />
            </div>
            <h4 className={styles.title}>Salle de bains</h4>
            <div className={styles.squareBlock}>
                <select id='toilet' className={styles.select}>
                    <option value={'vmeste'}>Combiné</option>
                    <option value={'rezdel'}>Séparé</option>
                </select>
            </div>

        </div>
    )
}