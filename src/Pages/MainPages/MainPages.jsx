import React, { useEffect,useState } from "react";
import styles from "./MainPages.module.css";
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

export const MainPages = ({ className }) => {
  const [showFavorites, setShowFavorites] = useState(false)
  const orders = useSelector((state) => state.favorites.orders);
  const showFavoriteModal = ()=>{
    setShowFavorites(!showFavorites)
}
  return (
    <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} /* removeToFavoritesList = {removeToFavoritesList} */>
      <div className={styles.wrapper}>
        <Categories />
        <div className={styles.title}>
          <h3 className={styles.textRecomendation}>Des recommandations pour vous</h3>
        </div>
        <div className={styles.productArea}>
          <div className={styles.products}>

          </div>
          <div className={styles.infoArea}>
            <span>Vos derniers achats</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
