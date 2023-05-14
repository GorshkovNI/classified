import * as React from 'react';
import styles from './UserAds.module.css'
import {Layout} from '../../component/Layout/Layout'
import {CardAd, ICardAd} from "./entites/CardAd/CardAd";
import {ProfileInfo} from "./entites/ProfileInfo/ProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from 'redux-thunk';
import {useEffect, useState} from "react";
import {deleteAd, getProfileInfo} from "./store/userProfileSlice";
import {getAds, getEmptyData, getIsLoading, getName} from "./store/userProfileSelector";
import MyLoader from "./entites/CardAd/SkeletonCard/Skeleton";
import {getUserName} from "../../store/auth/userSelector";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


type DispatchType = ThunkDispatch<any, any, any>;

const notify = () =>{
    toast.success('Успешно удалено', {
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

export const UserAds:React.FC = () => {

    const [showToast, setShowToast] = useState(false);

    const handleDelete = (categoryId:string, id: string) => {
        dispatch(deleteAd(categoryId, id));
        setShowToast(true);
        notify()
    };

    const dispatch: DispatchType = useDispatch()
    const ads = useSelector(getAds)
    const isLoading = useSelector(getIsLoading)
    const isEmpty = useSelector(getEmptyData)
    const userName = useSelector(getUserName)
    console.log(userName)

    useEffect(()=>{
        dispatch(getProfileInfo())
    }, [])

    return(
        <Layout isSearchBlock={false}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.userArea}>
                        {/*<div className={styles.test}></div>*/}
                        <ProfileInfo id={'1'} name={userName} />
                    </div>
                    <div>
                        <h3>Мои объявления</h3>
                        <div className={styles.adsAres}>
                            {!isLoading ? (
                                ads.length !== 0 ? (
                                    ads.map((item: ICardAd) => (
                                        <CardAd
                                            deleteAd={handleDelete}
                                            key={item['_id']}
                                            id={item['_id']}
                                            description={item.description}
                                            photos={item.photos}
                                            price={item.price}
                                            title={item.title}
                                            categoryId={item.categoryId}
                                            city={item.city}
                                        />
                                    ))
                                ) : (
                                    <div>У вас нет размещенных объявлений</div>
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