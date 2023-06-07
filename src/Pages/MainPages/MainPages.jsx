import React, { useEffect,useState } from "react";
import styles from "./MainPages.module.css";
import cn from "classnames";
import { Categories } from "../../component/Categories/Categories";
import { Layout } from "../../component/Layout/Layout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {getAdsByCity} from "./store/MainPageSlice";
import {getAdsCurrentCity, getCC, getIsAdsLoading} from "./store/MainPageSelector";
import {CardProduct} from "../../component/CardProduct/CardProduct";
import MyLoader from "../../component/Skeleton/Skeleton";



export const MainPages = () => {
  const [showFavorites, setShowFavorites] = useState(false)
  const orders = useSelector((state) => state.favorites.orders);

  const dispatch = useDispatch()

  let city = useSelector(getCC)
  city = city ? city : localStorage.getItem('city')



  useEffect(() => {
    const c = city ? city : localStorage.getItem('city')
    dispatch(getAdsByCity(c))
  }, [city])

  const adsCurrentCity = useSelector(getAdsCurrentCity)
  const isLoading = useSelector(getIsAdsLoading)


  const showFavoriteModal = () =>{
    setShowFavorites(!showFavorites)
  }
  console.log(city)

  return (
    <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} /* removeToFavoritesList = {removeToFavoritesList} */>
      <div className={styles.wrapper}>
        <Categories />
        <div className={styles.title}>
          {city ? <h3 className={styles.textRecomendation}>Des recommandations pour vous</h3> : null}
          {city?.length > 0 ? null : <h4>Pour obtenir des recommandations d'annonces, saisissez votre ville.</h4> }
        </div>
        <div className={styles.productArea}>
          {city ? <div className={styles.products}>
            {!isLoading ? adsCurrentCity?.length === 0? `Malheureusement, votre recherche n'a donné aucun résultat` : adsCurrentCity.map((ad) => {
              return <CardProduct id={ad['_id']} title={ad.title} city={ad.city} price={ad.price} photos={ad.photos} />
            }) : <MyLoader />
            }
          </div> : null}
          <div className={styles.infoArea}>
            {/*<span>Vos derniers achats</span>*/}
            <span></span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
