import * as React from "react";
import styles from "./ProductInfo.module.css";
import ImageGallery from "react-image-gallery";
import { Layout } from "../../component/Layout/Layout";
import { Button } from "../../component/Button/Button";
import { formatMoney } from "../../utils/formatMoney";
import cn from 'classnames'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoading, getName, getState} from "./store/ProductInfoSelector";
import {useEffect} from "react";
import {fetchProductById} from "./store/ProductInfoSlice";
import {ThunkDispatch} from "redux-thunk";
import SkeletonUserArea from "./asset/SkeletonUserArea";
import SkeletonLine from "./asset/SkeletonTitle";
import {Auto} from "./categories/Auto/Auto";
const four = require('./4.jpg');

type DispatchType = ThunkDispatch<any, any, any>;




export const ProductInfo:React.FC = () => {

  const { id } = useParams()
  const dispatch: DispatchType = useDispatch()

  useEffect(()=>{
    dispatch(fetchProductById(id))
  }, [])

  const product = useSelector(getState)
  const isLoading = useSelector(getIsLoading)

  const typeAD = {
    car: <Auto data={product} />
  }

  const images = [
    {
      original: four,
      thumbnail: four,
      originalClass: styles.images,
      thumbnailClass: styles.thumbImage,
    },
  ];

  const photos = product.photos.map((item) => {
    return{
      original: item,
      thumbnail: item,
      originalClass: styles.images,
      thumbnailClass: styles.thumbImage,
    }
  })


  const description = product.description.split('<br/>').map((paragraph, index) => {
    return (
        <p key={index}>{paragraph}</p>
    )
  })

  return (
    <Layout>
      <div className={styles.wrapper} >
        <div className={styles.itemView}>
          <div className={styles.itemNavigation}>
          </div>
          <div className={styles.itemContent}>
            <div className={styles.itemContent_left}>
              <div className={styles.titleInfoMain}>
                <div>
                  <h1 className={styles.titleInfo}>
                      { isLoading ?
                          <div className={styles.skeletonTitle}>
                            <SkeletonLine />
                          </div>

                          : product.productName}
                  </h1>
                </div>
                <div className={styles.titleActions}>
                  <Button className={styles.actionButton} size='small' mode="outlined" type='text' icon='love' classNameIcon={styles.buttonIconLove} onClick={() =>{}} >Добавить в избранное</Button>
                </div>
              </div>
              <div className={styles.viewMainContent}>
                <ImageGallery
                  items={photos}
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

                  {/*<Auto />*/}
                  {typeAD[product.category]}

                </div>
                <div className={styles.parametrs}> 
                    <h2 className={styles.parametrsSpan}>
                      Описание
                    </h2>
                    <div className={styles.description}>
                      {/*Какое-то описание*/}
                      {/*{product.description}*/}
                      {description}
                    </div>
                </div>
              </div>
            </div>
            <div className={styles.itemContent_right}>
              <div className={styles.priceBlock}>
                <h1 className={styles.price}>{!isLoading ? formatMoney(product.price) : <SkeletonLine width='200' /> }</h1>
              </div>
              <div className={styles.remouteArea}>
                <Button className={cn(styles.remouteButton, styles.remouteButtonCall)} size='medium' mode="contained" type='text' onClick={() => {}}>Показать телефон</Button>
                <Button className={cn(styles.remouteButton, styles.remouteButtonMessage)} size='medium' mode="contained" type='text' onClick={() => {}}>Написать сообщение</Button>
              </div>
              <div className={styles.infoSeller}>
                {
                  isLoading ? <SkeletonUserArea /> :
                      <>
                        <div className={styles.descriptionSeller}>
                          <span className={styles.userName}>{product.nameSeller}</span>
                          <span className={styles.rating}>5,0</span>
                          <span className={styles.time}>{'На гетит с ' + product.dateRegistration + ' года'}</span>
                        </div>
                        <div className={styles.iconArea}>
                          <span className={styles.icon}>{product?.nameSeller[0]?.toUpperCase()}</span>
                        </div>
                      </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
