import React from "react";
import styles from "./ProductInfo.module.css";
import { Header } from "../../component/Header/Header";
import ImageGallery from "react-image-gallery";
import one from "./1.jpg";
import qwe from "./qwe.jpg";
import two from "./2.jpg";
import three from "./3.jpg";
import { Layout } from "../../component/Layout/Layout";

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
                    Полиуретановая плёнка для фар
                  </h1>
                </div>
                <div className={styles.titleActions}>
                  <button>123</button>
                  <button>1234</button>
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
            </div>
            <div className={styles.itemContent_right}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
