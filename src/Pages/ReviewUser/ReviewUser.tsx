import * as React from "react";
import styles from './Review.module.css'
import {FC, useEffect, useState} from "react";
import {Layout} from "../../component/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getAds, getErrorReview, getIsLoading} from "../MyAds/store/userProfileSelector";
import {ThunkDispatch} from "redux-thunk";
import {getProfileInfo, setNewReview } from "../MyAds/store/userProfileSlice";
import {Card} from "./Card/Card";
import {Rating} from "../../component/Raiting/Raiting";
import {Button} from "../../component/Button/Button";
import {getRedirect} from "../../store/ad/adSelector";
import {toast, ToastContainer} from "react-toastify";

interface IReviewUser{

}



type DispatchType = ThunkDispatch<any, any, any>;

export const ReviewUser:FC<IReviewUser> = ({}) => {


    const [chooseAd, setChooseAd] = useState<string[]>([''])
    const [rating, setRating] = useState<string>('')
    const [review, setReview] = useState<string>('')

    const [showToast, setShowToast] = useState<boolean>(false)

    const errorReview = useSelector(getErrorReview)
    const isLoading = useSelector(getIsLoading)

    const message = errorReview ? 'Ajouté avec succès': 'Vous avez déjà laissé un avis d\'utilisateur'

    const notify = () =>{
        toast.success(message, {
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

    const [redirect, setRedirect] = useState<boolean>(false)

    const location = useLocation()
    const navigate = useNavigate()

    const user = useParams()
    const ads = useSelector(getAds)
    const dispatch:DispatchType = useDispatch()
    console.log(ads)

    useEffect(() => {
        dispatch(getProfileInfo(user.id))
    }, [])

    const handleChooseAd = (event) => {
        const ad = ads.find(item => item['_id'] === event.currentTarget.id)
        console.log(ad)
        setChooseAd([ad['_id'], ad.title, ad.photos[0]?.url])
    }

    const handleRatingSelected = (index) => {
        setRating(index);
    };

    const registrationReview = async () => {

        const newReview = {
            user_id: localStorage.getItem('user_id'),
            text: review,
            rating: Number(rating),
            idAd: chooseAd[0],
            title: chooseAd[1],
            photo: chooseAd[2]
        }
        await dispatch(setNewReview(user.id, newReview))
        setShowToast(true)
        notify()
        setRedirect(true)

    }

    useEffect(() => {
        if(redirect){
            setTimeout(() => {
                navigate(`/profile/${user.id}`, { state: { from: location.pathname } })
            }, 2000)

        }

    }, [redirect])

    const whatReview = {
        id: chooseAd[0],
        title: chooseAd[1],
        photo: chooseAd[2]
    }

    return(
        <Layout isSearchBlock={false} >
            <div className={styles.wrapper}>
                {chooseAd.length === 1 && ads.map((ad) => {
                    const newAd = {
                        id: ad['_id'],
                        title: ad.title,
                        photo: ad.photos[0]?.url
                    }
                    return <Card adObj={newAd} getId={handleChooseAd} />
                })}
                { chooseAd.length > 1 &&
                    <div className={styles.review}>
                        <Card adObj={whatReview} getId={() => {}} />
                        <Rating rating={0} staticMode={false} onRatingSelected = {handleRatingSelected} />
                        <textarea rows={4} cols={50} name="subject" placeholder="Entrez votre message:"
                                  className="message" value={review} onChange={(e) => {setReview(e.target.value)}} required></textarea>
                        <Button size='medium' type={''} className={''} onClick={registrationReview}>{isLoading? 'Chargement...' : "Envoyer"}</Button>
                    </div>
                }
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