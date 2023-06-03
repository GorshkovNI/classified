import React, {useEffect, useState} from "react";
import styles from "./RentPoint.module.css"
import {Categories} from "../../../../component/Categories/Categories";
import MyLoader from "../../../../component/Skeleton/Skeleton";
import {CardProduct} from "../../../../component/CardProduct/CardProduct";
import {Transport} from "../../Categories/Transport";
import {Button} from "../../../../component/Button/Button";
import {Layout} from "../../../../component/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import SearchService from "../../../../service/SearchService";


export const WorkPoint = () => {

    const [ads, setAds] = useState([])

    const [showFavorites, setShowFavorites] = useState(false)
    const orders = useSelector((state) => state.favorites.orders);


    const showFavoriteModal = ()=>{
        setShowFavorites(!showFavorites)
    }


    // useEffect(async () => {
    //     // await setAds(SearchService.searchWork(localStorage.getItem('city')))
    // }, [])

    console.log(ads)

    return(
        <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} >
            <div className={styles.wrapper}>
                <Categories />
                <div className={styles.title}>
                    <h3 className={styles.textRecomendation}>Annonce trouvée</h3>
                </div>
                <div className={styles.productArea}>
                    <div className={styles.products}>
                        { ads.length > 0 ? ads?.map((item)=> {
                            return <CardProduct id={item.ads_id} title={item.title} city={item.city} price={item.price} photos={item.photos} />
                        }) : <div>Aucune annonce trouvée pour les paramètres donnés</div>}
                    </div>
                    <div className={styles.infoArea}>
                    </div>
                </div>

            </div>
        </Layout>
    )

}