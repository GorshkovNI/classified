import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../component/Button/Button";
import { CardProduct } from "../../../../component/CardProduct/CardProduct";
import { Categories } from "../../../../component/Categories/Categories";
import { Layout } from "../../../../component/Layout/Layout";
import { getIsLoading } from "../../../../component/SearchBlock/store/searchSelector";
import {getAllAds, getFilterAd} from "../Transport/store/TransportPointSelector"
import {getAdsTransport, setFilters} from "../Transport/store/TransportPointSlice";
import MyLoader from "../../../../component/Skeleton/Skeleton";
import { Transport } from "../../Categories/Transport";
import styles from "./TransportPoint.module.css"


export const TransportPoint = () => {

    const [selectedMarkId, setSelectedMarkId] = useState('')
    const [selectedModelId, setSelectedModelId] = useState('')
    const [selectedYearTo, setSelectedYearTo] = useState('')
    const [selectedYearFrom, setSelectedYearFrom] = useState('')
    const [selectedMark, setSelectedMark] = useState('')
    const [selectedModel, setSelectedModel] = useState('')

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
    const fA = useSelector(getFilterAd)
    console.log(fA)

    const handleFilters = () => {
        const filter = {
            marka: selectedMark == 'Choisissez une valeur' ? '' : selectedMark,
            model: selectedModel == 'Choisissez une valeur' ? '' : selectedModel,
            yearTo: selectedYearFrom,
            yearFrom: selectedYearTo
        }
        dispatch(setFilters(filter))
    }

    const handleSelectedYearTo = (event) => {
        setSelectedYearTo(event.target.value)
    }

    const handleSelectedYearFrom = (event) => {
        setSelectedYearFrom(event.target.value)
    }

    const handleSelectedMark = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        const selectedValue = selectedOption.text;

        setSelectedMarkId(event.target.value)
        setSelectedMark(selectedValue)
    }

    const handleSelectedModel = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        const selectedValue = selectedOption.text;

        setSelectedModel(selectedValue)
        setSelectedModelId(event.target.value)
    }

    return(
        <Layout orders = {orders} showFavoriteModal = {showFavoriteModal} showFavorites={showFavorites} >
            <div className={styles.wrapper}>
                <Categories />
                <div className={styles.title}>
                    <h3 className={styles.textRecomendation}>Annonce trouvée</h3>
                </div>
                <div className={styles.productArea}>
                    <div className={styles.products}>
                        { isLoading ? <MyLoader/> : fA.length > 0 ? fA?.map((item)=> {
                        return <CardProduct id={item.ads_id} title={item.title} city={item.city} price={item.price} photos={item.photos} />
                        }) : <div>Aucune annonce trouvée pour les paramètres donnés</div>}
                    </div>
                    <div className={styles.infoArea}>
                        <Transport
                            selectedMarkId={selectedMarkId}
                            selectedModelId={selectedModelId}
                            selectedYearFrom={selectedYearFrom}
                            selectedYearTo={selectedYearTo}
                            handleSelectedYearTo={handleSelectedYearTo}
                            handleSelectedYearFrom={handleSelectedYearFrom}
                            handleSelectedMark={handleSelectedMark}
                            handleSelectedModel={handleSelectedModel}
                        />
                        <Button className={styles.buttonSend} onClick={handleFilters}>Envoyer</Button>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}