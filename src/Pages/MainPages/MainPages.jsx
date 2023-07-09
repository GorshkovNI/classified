import React, { useEffect, useState } from "react";
import styles from "./MainPages.module.css";
import cn from "classnames";
import { Categories } from "../../component/Categories/Categories";
import { Layout } from "../../component/Layout/Layout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAdsByCity } from "./store/MainPageSlice";
import { getAdsCurrentCity, getCC, getIsAdsLoading } from "./store/MainPageSelector";
import { CardProduct } from "../../component/CardProduct/CardProduct";
import MyLoader from "../../component/Skeleton/Skeleton";
import Pagination from "../../component/Pagination/Pagintation";
import Products from "../../component/Products/Products";

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



  const [itemsPerPage, setItensPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(adsCurrentCity.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = adsCurrentCity.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const showFavoriteModal = () => {
    setShowFavorites(!showFavorites)
  }
  
  return (
    <Layout orders={orders} showFavoriteModal={showFavoriteModal} showFavorites={showFavorites} /* removeToFavoritesList = {removeToFavoritesList} */>
      <div className={styles.wrapper}>
        <Categories />
        <div className={styles.title}>
          {city ? <h3 className={styles.textRecomendation}>Des recommandations pour vous</h3> : null}
          {city?.length > 0 ? null : <h4>Pour obtenir des recommandations d'annonces, saisissez votre ville.</h4>}
        </div>
        <div className={styles.productArea}>
          {city ? <div className={styles.products}>
            {!isLoading ? adsCurrentCity?.length === 0 ? `Malheureusement, votre recherche n'a donné aucun résultat` :
              <Products currentData={currentData} itemsPerPage={itemsPerPage}></Products>
              : <MyLoader />
            }

          </div> : null}

          <div className={styles.infoArea}>
            {/*<span>Vos derniers achats</span>*/}
            <span></span>
          </div>
        </div>
        <div className={styles.pagination}>
          < Pagination itemsPerPage={itemsPerPage} totalPages={totalPages} currentPage={currentPage} paginate={paginate}>  </Pagination>
          <div className={styles.paginationButton}>
            <button className="btn btn-primary" style={{margin: "0 5px 0 5px"}} onClick={prevPage} disabled={currentPage === 1}>
              En arrière
            </button>
            <button className="btn btn-primary" onClick={nextPage} disabled={currentPage === totalPages}>
              En arrière
            </button>
          </div>

        </div>
      </div>
    </Layout >
  );
};
