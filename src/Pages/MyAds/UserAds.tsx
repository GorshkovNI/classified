import * as React from 'react';
import styles from './UserAds.module.css'
import {Layout} from '../../component/Layout/Layout'
import {CardAd, ICardAd} from "./entites/CardAd/CardAd";
import {ProfileInfo} from "./entites/ProfileInfo/ProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from 'redux-thunk';
import {useEffect} from "react";
import {getProfileInfo} from "./store/userProfileSlice";
import {getAds, getEmptyData, getIsLoading, getName} from "./store/userProfileSelector";
import MyLoader from "./entites/CardAd/SkeletonCard/Skeleton";
import {getUserName} from "../../store/auth/userSelector";


type DispatchType = ThunkDispatch<any, any, any>;

export const UserAds:React.FC = () => {

    const dispatch: DispatchType = useDispatch()
    const ads = useSelector(getAds)
    const isLoading = useSelector(getIsLoading)
    const isEmpty = useSelector(getEmptyData)
    const name = useSelector(getUserName)
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
                        <ProfileInfo id={'1'} name={name} />
                    </div>
                    <div>
                        <h3>Мои объявления</h3>
                        <div className={styles.adsAres}>
                            {!isLoading ?
                                !isEmpty ? ads.map((item: ICardAd) => {
                                return <CardAd key={item['_id']} id={item['_id']} description={item.description} photos={item.photos} price={item.price} title={item.title} categoryId={item.categoryId} />
                            }) : <div>У вас нет размещенных объявлений</div> : <MyLoader />}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}