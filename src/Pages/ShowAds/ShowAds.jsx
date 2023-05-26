import React, { useEffect,useState } from "react";
import styles from "./ShowAds.module.css";
import cn from "classnames";
import { Input } from "../../component/Input/Input";
import { Icon } from "../../component/Icons/Icon";
import { CardProduct } from "../../component/CardProduct/CardProduct";
import { Categories } from "../../component/Categories/Categories";
import { Layout } from "../../component/Layout/Layout";
import { useDispatch } from "react-redux";
import { setFavorites } from "../../store/favorites/favoritesSlice";
import { getFavorites } from "../../store/favorites/favoriteSelector";
import { useSelector } from "react-redux";
import {
  getAdWithFilter,
  getAllAds,
  getIsLoading,
  getPriceFrom,
  getPriceTo
} from "../../component/SearchBlock/store/searchSelector";
import {formatMoney} from "../AddNewAds/categories/utils/formMoney";
import {setPriceFrom, setPriceTo} from "../../component/SearchBlock/store/searchSlice";
import Skeleton from "../../component/Skeleton/Skeleton";
import { Transport } from './Categories/Transport'

const allCategories = {
  transport: <Transport />
}


export const ShowAds = ({ className }) => {
  const [showFavorites, setShowFavorites] = useState(false)
  const [priceTo, setCurrentPriceTo] = useState(null)
  const [priceFrom, setCurrentPriceFrom] = useState(null)

  const [categories, setCategories] = useState('')

  const handleSetCategoris = (event) => {
    setCategories(event.target.value)
  }


  const orders = useSelector((state) => state.favorites.orders);

  const dispatch = useDispatch()

  const adsFound = useSelector(getAllAds)
  const isLoading = useSelector(getIsLoading)
  const filterAd = useSelector(getAdWithFilter)
  console.log(filterAd)


  console.log(adsFound)

  const showFavoriteModal = ()=>{
    setShowFavorites(!showFavorites)
  }

  const handleSetPriceTo = (event) => {
    setCurrentPriceTo(event.target.value)
  }

  const handleSetPriceFrom = (event) => {
    setCurrentPriceFrom(event.target.value)
  }

  const sendPrice = () => {
    dispatch(setPriceTo(priceTo))
    dispatch(setPriceFrom(priceFrom))
  }

  return (
    <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} /* removeToFavoritesList = {removeToFavoritesList} */>
      <div className={styles.wrapper}>
        <Categories />
        <div className={styles.title}>
          <h3 className={styles.textRecomendation}>Найденные объявление</h3>
        </div>
        <div className={styles.productArea}>
          <div className={styles.products}>
            { isLoading ? <Skeleton /> : filterAd.length > 0 ? filterAd?.map((item)=> {
              return <CardProduct id={item['_id']} title={item.title} city={item.city} price={item.price} photos={item.photos} />
            }) : <div>По заданным параметрам объявлений не найдено</div>}
          </div>
          <div className={styles.infoArea}>
            <h3>Фильтры</h3>
            <select id='categories' value={categories} onChange={handleSetCategoris} className={cn(styles.select, styles.categories)}>
              <option selected>Choisir une catégorie</option>
              <option value='transport'>Transport</option>
              <option value='rent'>Emploi</option>
              <option value='job'>Immobilier</option>
            </select>
            {allCategories[categories]}
            <div className={styles.titleFilter}>
              <h4 className={styles.title}>Цена</h4>
              <div className={styles.inputBlock}>
                <input type={'number'} className={styles.input} value={priceTo} onChange={handleSetPriceTo} placeholder='От'></input>
                <input type={'number'} className={styles.input} value={priceFrom} onChange={handleSetPriceFrom} placeholder='До'></input>
              </div>
              <button className={styles.buttonSend} onClick={sendPrice}>Send</button>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
