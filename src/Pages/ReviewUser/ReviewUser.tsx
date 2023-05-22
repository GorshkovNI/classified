import * as React from "react";
import styles from './Review.module.css'
import {FC, useEffect, useState} from "react";
import {Layout} from "../../component/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAds} from "../MyAds/store/userProfileSelector";
import {ThunkDispatch} from "redux-thunk";
import {getProfileInfo, setNewReview } from "../MyAds/store/userProfileSlice";
import {Card} from "./Card/Card";
import {Rating} from "../../component/Raiting/Raiting";
import {Button} from "../../component/Button/Button";

interface IReviewUser{

}

type DispatchType = ThunkDispatch<any, any, any>;

export const ReviewUser:FC<IReviewUser> = ({}) => {

    const [chooseAd, setChooseAd] = useState<string[]>([''])
    const [rating, setRating] = useState<string>('')
    const [review, setReview] = useState<string>('')

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

    const registrationReview = () => {

        const newReview = {
            user_id: localStorage.getItem('user_id'),
            text: review,
            rating: Number(rating),
            idAd: chooseAd[0],
            title: chooseAd[1],
            photo: chooseAd[2]
        }
        dispatch(setNewReview(user.id, newReview))
    }

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
                        <textarea rows={4} cols={50} name="subject" placeholder="Введите ваше сообщение:"
                                  className="message" value={review} onChange={(e) => {setReview(e.target.value)}} required></textarea>
                        <Button size='medium' type={''} className={''} onClick={registrationReview}>{"Отправить"}</Button>
                    </div>
                }
            </div>


        </Layout>
    )
}