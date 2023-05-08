import React from "react";
import styles from './Auto.module.css'

export const Auto = ({data}) => {
    return(
        <ul className={styles.parametrsList}>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Год выпуска: </span>
                      2020
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Поколение: </span>
                      III
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Пробег: </span>
                      159000км
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Владельцев:  </span>
                      1
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Модификация:  </span>
                      2.0 TDI 4WD DSG (184 л.с.)
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Объём двигателя:  </span>
                      2.0 л
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Коробка передач:  </span>
                      Робот
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Привод:  </span>
                      Полный
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Комплектация:  </span>
                      Базовая
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Тип кузова:  </span>
                      Универсал
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Цвет:  </span>
                      Серый
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Руль:  </span>
                      Левый
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>VIN или номер кузова:  </span>
                      TMBL*************
                    </li>
                  </ul>
    )
}