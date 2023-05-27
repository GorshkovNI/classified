import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../component/Button/Button";
import { CardProduct } from "../../../../component/CardProduct/CardProduct";
import { Categories } from "../../../../component/Categories/Categories";
import { Layout } from "../../../../component/Layout/Layout";
import { getAllAds, getIsLoading } from "../../../../component/SearchBlock/store/searchSelector";
import { getAdsTransport } from "../../../../component/SearchBlock/store/searchSlice";
import MyLoader from "../../../../component/Skeleton/Skeleton";
import { Transport } from "../../Categories/Transport";
import styles from "./TransportPoint.module.css"

export const TransportPoint = () => {

    const [showFavorites, setShowFavorites] = useState(false)
    const orders = useSelector((state) => state.favorites.orders);
    const showFavoriteModal = ()=>{
        setShowFavorites(!showFavorites)
      }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdsTransport(localStorage.getItem('city')))
    }, [])


    const isLoading = useSelector(getIsLoading)
    const ads = useSelector(getAllAds)

    return(
        <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} >
            <div className={styles.wrapper}>
                <Categories />
                <div className={styles.title}>
                    <h3 className={styles.textRecomendation}>Annonce trouvée</h3>
                </div>
                <div className={styles.productArea}>
                    <div className={styles.products}>
                        { isLoading ? <MyLoader/> : ads.length > 0 ? ads?.map((item)=> {
                        return <CardProduct id={item['_id']} title={item.title} city={item.city} price={item.price} photos={item.photos} />
                        }) : <div>По заданным параметрам объявлений не найдено</div>}
                    </div>
                    <div className={styles.infoArea}>
                        <Transport />
                        <Button className={styles.buttonSend}>Envoyer</Button>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}