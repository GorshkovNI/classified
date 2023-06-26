import React, {useEffect, useState} from "react";
import styles from "./RentPoint.module.css"
import {Categories} from "../../../../component/Categories/Categories";
import MyLoader from "../../../../component/Skeleton/Skeleton";
import {CardProduct} from "../../../../component/CardProduct/CardProduct";
import {Transport} from "../../Categories/Transport";
import {Button} from "../../../../component/Button/Button";
import {Layout} from "../../../../component/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getAdsRent, setFilterss} from "./store/RentPointSlice";
import {getAllRent, getFilterAd, getLoading} from "./store/RentPointSelector";
import {Rent} from "../../../ShowAds/Categories/Rent";


const toilet = {
    vmeste: 'Combiné',
    rezdel: 'Séparé'
}

export const RentPoint = () => {

    const [squareTo, setSquareTo] = useState(0)
    const [squareFrom, setSquareFrom] = useState(0)

    const [squareKitchenFrom, setSquareKitchenFrom] = useState(0)
    const [squareKitchenTo, setSquareKitchenTo] = useState(0)

    const [floorFrom, setFloorFrom] = useState(0)
    const [floorTo, setFloorTo] = useState(0)

    const [tol, setTol] = useState(toilet.vmeste)

    const handleTol = (event) => {
        setTol(toilet[event.target.value])
    }



    const handleSquareTo = (event) => {
        console.log(event.target.value)
        setSquareTo(event.target.value)
    }

    const handleSquareFrom = (event) => {
        setSquareFrom(event.target.value)
    }

    const handleSquareKitchenFrom = (event) => {
        setSquareKitchenFrom(event.target.value)
    }

    const handleSquareKitchenTo = (event) => {
        setSquareKitchenTo(event.target.value)
    }

    const handleFloorFrom = (event) => {
        setFloorFrom(event.target.value)
    }

    const handleFloorTo = (event) => {
        setFloorTo(event.target.value)
    }

    const [showFavorites, setShowFavorites] = useState(false)
    const orders = useSelector((state) => state.favorites.orders);

    const dispatch = useDispatch()

    const showFavoriteModal = ()=>{
        setShowFavorites(!showFavorites)
    }

    const handleSendData = () => {
        const data = {
            squareTo: squareTo,
            squareFrom: squareFrom,
            squareKitchenTo: squareKitchenTo,
            squareKitchenFrom: squareKitchenFrom,
            floorTo: floorTo,
            floorFrom: floorFrom,
            bathroom: tol
        }
        dispatch(setFilterss(data))
    }

    const a = useSelector(getAllRent)
    const filtersRent = useSelector(getFilterAd)
    const isLoading = useSelector(getLoading)
    console.log(filtersRent)

    useEffect(() => {
        dispatch(getAdsRent(localStorage.getItem('city')))
    }, [])

    return(
        <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} >
            <div className={styles.wrapper}>
                <Categories />
                <div className={styles.title}>
                    <h3 className={styles.textRecomendation}>Annonce trouvée</h3>
                </div>
                <div className={styles.productArea}>
                    <div className={styles.products}>
                        { isLoading ? <MyLoader/> : filtersRent.length > 0 ? filtersRent?.map((item)=> {
                            return <CardProduct id={item.ads_id} title={item.title} city={item.city} price={item.price} photos={item.photos} up={item.up} />
                        }) : <div>Aucune annonce trouvée pour les paramètres donnés</div>}
                    </div>
                    <div className={styles.infoArea}>
                        <Rent
                            squareTo={squareTo}
                            squareFrom={squareFrom}
                            squareKitchenFrom={squareKitchenFrom}
                            squareKitchenTo={squareKitchenTo}
                            floorFrom={floorFrom}
                            floorTo={floorTo}
                            handleSquareTo={handleSquareTo}
                            handleSquareFrom={handleSquareFrom}
                            handleSquareKitchenFrom={handleSquareKitchenFrom}
                            handleSquareKitchenTo={handleSquareKitchenTo}
                            handleFloorFrom={handleFloorFrom}
                            handleFloorTo={handleFloorTo}
                            tol={tol}
                            handleTol={handleTol}
                        />
                        <Button className={styles.buttonSend} onClick={handleSendData} >Envoyer</Button>
                    </div>
                </div>

            </div>
        </Layout>
    )

}