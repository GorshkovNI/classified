import * as React from 'react';
import styles from './UserAds.module.css'
import {Layout} from '../../component/Layout/Layout'
import {CardAd, ICardAd} from "./entites/CardAd/CardAd";
import {ProfileInfo} from "./entites/ProfileInfo/ProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from 'redux-thunk';
import {useEffect} from "react";
import {getProfileInfo} from "./store/userProfileSlice";
import {getAds, getEmptyData, getIsLoading} from "./store/userProfileSelector";
import MyLoader from "./entites/CardAd/SkeletonCard/Skeleton";


type DispatchType = ThunkDispatch<any, any, any>;

export const UserAds:React.FC = () => {

    const dispatch: DispatchType = useDispatch()
    const ads = useSelector(getAds)
    const isLoading = useSelector(getIsLoading)
    const isEmpty = useSelector(getEmptyData)
    console.log(ads)

    useEffect(()=>{
        dispatch(getProfileInfo())
    }, [])

    return(
        <Layout isSearchBlock={false}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.userArea}>
                        {/*<div className={styles.test}></div>*/}
                        <ProfileInfo id={'1'} />
                    </div>
                    <div>
                        <h3>Мои объявления</h3>
                        <div className={styles.adsAres}>
                            {!isLoading ?
                                !isEmpty ? ads.map((item: ICardAd) => {
                                return <CardAd key={item.id} id={item.id} description={item.description} photos={item.photos} price={item.price} title={item.title} />
                            }) : <div>У вас нет размещенных объявлений</div> : <MyLoader />}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}