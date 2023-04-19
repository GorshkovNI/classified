import React from "react";
import styles from "./ProductInfo.module.css";
import { Header } from "../../component/Header/Header";
import ImageGallery from "react-image-gallery";
import one from "./1.jpg";
import qwe from "./qwe.jpg";
import two from "./2.jpg";
import three from "./3.jpg";
import { Layout } from "../../component/Layout/Layout";
import { Button } from "../../component/Button/Button";

const images = [
  {
    original: qwe,
    thumbnail: qwe,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: qwe,
    thumbnail: qwe,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: qwe,
    thumbnail: qwe,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
];

export const ProductInfo = ({ toggleModal, getId }) => {
  return (
    <Layout>
      <div className={styles.wrapper} id='3645' onClick={getId}>
        <div className={styles.itemView}>
          <div className={styles.itemNavigation}>
            {" "}
            Транспорт - Запчасти и аксессуары - Тюнинг
          </div>
          <div className={styles.itemContent}>
            <div className={styles.itemContent_left}>
              <div className={styles.titleInfoMain}>
                <div>
                  <h1 className={styles.titleInfo}>
                    Skoda Octavia A7, 2020
                  </h1>
                </div>
                <div className={styles.titleActions}>
                  <Button className={styles.actionButton} mode="outlined" type='text' icon='love' classNameIcon={styles.buttonIconLove} >Добавить в избранное</Button>
                </div>
              </div>
              <div className={styles.viewMainContent}>
                <ImageGallery
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  additionalClass={styles.gallery}
                />
              </div>
              <div className={styles.descriptionBlock}>
                <div className={styles.parametrs}>
                  <h2 className={styles.parametrsSpan}>
                    Характеристики
                  </h2>
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
                      <span className={styles.item}>ПТС </span>
                      Электронный
                    </li>
                    <li className={styles.itemUl}>
                      <span className={styles.item}>Владельцев по ПТС:  </span>
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
                  
                </div>
                <div className={styles.parametrs}> 
                    <h2 className={styles.parametrsSpan}>
                      Описание
                    </h2>
                    <pre>
                      Какое-то описание для машины
                    </pre>
                </div>
              </div>
            </div>
            <div className={styles.itemContent_right}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
