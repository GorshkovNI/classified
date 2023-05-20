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

    const [idAd, setIdAd] = useState<string>('')
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
        setIdAd(event.currentTarget.id)
    }

    const handleRatingSelected = (index) => {
        setRating(index);
    };

    const registrationReview = () => {
        const newReview = {
            user_id: user.id,
            text: review,
            rating: rating
        }
        dispatch(setNewReview(newReview))
    }

    console.log(idAd)
    return(
        <Layout isSearchBlock={false} >
            <div className={styles.wrapper}>
                {idAd.length == 0 && ads.map((ad) => {
                    const newAd = {
                        id: ad['_id'],
                        title: ad.title,
                        photo: ad.photos[0]?.url
                    }
                    return <Card adObj={newAd} getId={handleChooseAd} />
                })}
                <div className={styles.review}>
                    <Rating rating={0} staticMode={false} onRatingSelected = {handleRatingSelected} />
                    <textarea rows={4} cols={50} name="subject" placeholder="Введите ваше сообщение:"
                              className="message" value={review} onChange={(e) => {setReview(e.target.value)}} required></textarea>
                    <Button size='medium' type={''} className={''} onClick={registrationReview}>{"Отправить"}</Button>
                </div>
            </div>


        </Layout>
    )
}