import React from "react";
import styles from "./ProductInfo.module.css";
import { Header } from "../../component/Header/Header";
import ImageGallery from "react-image-gallery";
import four from "./4.jpg";
import { Layout } from "../../component/Layout/Layout";
import { Button } from "../../component/Button/Button";
import { formatMoney } from "../../utils/formatMoney";
import cn from 'classnames'
import { Auto } from "./categories/Auto/Auto";
import { useState } from "react";

const images = [
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
  {
    original: four,
    thumbnail: four,
    originalClass: styles.images,
    thumbnailClass: styles.thumbImage,
  },
];

export const ProductInfo = ({ toggleModal, getId }) => {

  const [adTypes, setAdTypes] = useState('') // Храним тип объявления: авто, недвижимость и т.д


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
                    Клей, тюбик 100мл
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
                  <Auto />
                </div>
                <div className={styles.parametrs}> 
                    <h2 className={styles.parametrsSpan}>
                      Описание
                    </h2>
                    <pre>
                      Какое-то описание для машины

                      Залупа


                      Пенис
                    </pre>
                </div>
              </div>
            </div>
            <div className={styles.itemContent_right}>
              <div className={styles.priceBlock}>
                <h1 className={styles.price}>{formatMoney(1000000)}</h1>
              </div>
              <div className={styles.remouteArea}>
                <Button className={cn(styles.remouteButton, styles.remouteButtonCall)} mode="contained" type='text' >Показать телефон</Button>
                <Button className={cn(styles.remouteButton, styles.remouteButtonMessage)} mode="contained" type='text'>Написать сообщение</Button>
              </div>
              <div className={styles.infoSeller}>
                <div className={styles.descriptionSeller}>
                  <span className={styles.userName}>Продавец</span>
                  <span className={styles.rating}>5,0</span>
                  <span className={styles.time}>{`На авито с 2021`}</span>
                </div>
                  <div className={styles.iconArea}>
                      <span className={styles.icon}>{'Продавец'[0].toUpperCase()}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
