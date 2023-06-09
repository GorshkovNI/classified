import * as React from 'react';
import styles from './UserAds.module.css'
import {Layout} from '../../component/Layout/Layout'
import {CardAd, ICardAd} from "./entites/CardAd/CardAd";
import {ProfileInfo} from "./entites/ProfileInfo/ProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from 'redux-thunk';
import {FC, useEffect, useState} from "react";
import {deleteAd, getProfileInfo, upAd} from "./store/userProfileSlice";
import {getAds, getEmptyData, getIsLoading, getName, getUserInfo} from "./store/userProfileSelector";
import MyLoader from "./entites/CardAd/SkeletonCard/Skeleton";
import {getIsAuth, getUserName} from "../../store/auth/userSelector";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";



type DispatchType = ThunkDispatch<any, any, any>;

const notify = (text:string) =>{
    toast.success(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}




export const UserAds:FC = () => {

    const [showToast, setShowToast] = useState(false);

    const {id} = useParams()

    const handleDelete = (categoryId:string, id: string) => {
        dispatch(deleteAd(categoryId, id));
        setShowToast(true);
        notify('Suppression réussie')
    };

    const handleUpAd = (categoryId:string, id: string) => {
        dispatch(upAd(categoryId, id));
        setShowToast(true);
        notify('Promotion activée')
    }

    const dispatch: DispatchType = useDispatch()
    const ads = useSelector(getAds)
    const isLoading = useSelector(getIsLoading)

    const userInfo = useSelector(getUserInfo)
    const isAuth = useSelector(getIsAuth)

    useEffect(()=>{
        dispatch(getProfileInfo(id))
    }, [id])
    console.log(ads)
    return(
        <Layout isSearchBlock={false}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.userArea}>
                        {/*<div className={styles.test}></div>*/}
                        <ProfileInfo id={id} name={userInfo.name} avatar={userInfo.avatar} rating={userInfo.totalRating} review={userInfo.reviews} />
                    </div>
                    <div>
                        <h3>Mes annonces</h3>
                        <div className={styles.adsAres}>
                            {!isLoading ? (
                                ads.length !== 0 ? (
                                    ads.map((item: ICardAd) => (
                                        <CardAd
                                            user_id={userInfo.user_id}
                                            deleteAd={handleDelete}
                                            key={item['_id']}
                                            id={item['_id']}
                                            description={item.description}
                                            photos={item.photos}
                                            price={item.price}
                                            title={item.title}
                                            categoryId={item.categoryId}
                                            city={item.city}
                                            isAuth={isAuth}
                                            up={item.up}
                                            upAd={handleUpAd}
                                        />
                                    ))
                                ) : (
                                    <div>Vous n'avez pas publié d'annonces</div>
                                )
                            ) : (
                                <MyLoader />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showToast && <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />}
        </Layout>

    )
}