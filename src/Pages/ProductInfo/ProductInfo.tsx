import * as React from "react";
import styles from "./ProductInfo.module.css";
import ImageGallery from "react-image-gallery";
import { Layout } from "../../component/Layout/Layout";
import { Button } from "../../component/Button/Button";
import { formatMoney } from "../../utils/formatMoney";
import cn from 'classnames'
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoading, getName, getState} from "./store/ProductInfoSelector";
import {useEffect} from "react";
import {fetchProductById} from "./store/ProductInfoSlice";
import {ThunkDispatch} from "redux-thunk";
import SkeletonUserArea from "./asset/SkeletonUserArea";
import SkeletonLine from "./asset/SkeletonTitle";
import {Fields} from "./categories/Fields/Fields";
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


  console.log(product)

  const photos = product?.info?.photos?.map((item:string) => {
    return{
      original: item['url'],
      thumbnail: item['url'],
      originalClass: styles.images,
      thumbnailClass: styles.thumbImage,
    }
  })

  console.log(product.info.description)
  const description = product.info.description?.split('<br/>').map((paragraph, index) => {
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

                          : product.info.title}
                  </h1>
                </div>
                <div className={styles.titleActions}>
                  <Button className={styles.actionButton} size='small' mode="outlined" type='text' icon='love' classNameIcon={styles.buttonIconLove} onClick={() =>{}} >Добавить в избранное</Button>
                  <Button className={styles.actionButton} size='small' mode="outlined" type='text' icon='edit' classNameIcon={styles.buttonIconEdit} onClick={() =>{}} >Редактировать</Button>
                </div>
              </div>
              <div className={styles.viewMainContent}>
                {photos && <ImageGallery
                  items={photos}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  additionalClass={styles.gallery}
                />}
              </div>
              <div className={styles.descriptionBlock}>
                <div className={styles.parametrs}>
                  <h2 className={styles.parametrsSpan}>
                    Город
                  </h2>
                  <span className={styles.city}>{product.info.city}</span>
                </div>
                <div className={styles.parametrs}>
                  <h2 className={styles.parametrsSpan}>
                    Характеристики
                  </h2>

                  {/*<Fields />*/}
                  <Fields data={product} />

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
                <h1 className={styles.price}>{!isLoading ? formatMoney(product.info.price) : <SkeletonLine width='200' /> }</h1>
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
                            <Link className={styles.userName} to={`/profile/${product.user.idSeller}`} >
                              {product.user.nameSeller}
                            </Link>
                          <span className={styles.rating}>5,0</span>
                          <span className={styles.time}>{'На гетит с ' + product.user.dateRegistration + ' года'}</span>
                        </div>
                        <div className={styles.iconArea}>
                          {product.user.photo ? <img className={styles.avatar} src={product.user.photo} /> : <span className={styles.icon}>{product?.user.nameSeller[0]?.toUpperCase()}</span> }
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
