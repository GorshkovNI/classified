import * as React from "react";
import styles from './ProfileInfo.module.css'
import {FC, useEffect, useState} from "react";
import {Rating} from "../../../../component/Raiting/Raiting";
import {Icon} from "../../../../component/Icons/Icon";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {getIsAuth, getIsLoadAvatar, getPhoto} from "../../../../store/auth/userSelector";
import {changeAvatar, setPhoto} from "../../../../store/auth/userSlice";
import {deleteAd} from "../../store/userProfileSlice";
import {ThunkDispatch} from "redux-thunk";
import {Link} from "react-router-dom";


interface IProfileInfo {
    id: string,
    name: string,
    avatar: string
}

type DispatchType = ThunkDispatch<any, any, any>;

export const ProfileInfo:FC<IProfileInfo> = ({id, name, avatar}) => {

    console.log(id)
    const dispatch:DispatchType = useDispatch()

    const isLoadAvatar = useSelector(getIsLoadAvatar)
    const isAuth = useSelector(getIsAuth)

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const photo = reader.result;
                dispatch(changeAvatar(photo, id));
            };
        }
    }

    return(
        <div className={styles.container} >
            <div className={styles.avatarArea}>
                {isLoadAvatar && <Icon name='avatar' className={styles.preloaderAvatar} onClick={() => {}} />}
                {avatar ? <img className={styles.avatar} src={avatar} /> : <div className={styles.secondAvatar}>{name[0]}</div>}
                {id === localStorage.getItem("user_id") && isAuth &&
                    <>
                        <label htmlFor='photo' className={styles.uploaderPhotoLabel}>
                            <div className={styles.backgroundIcon}>
                                <Icon name='photo' className={styles.preloaderIcon} onClick={() => {}} />
                            </div>
                        </label>
                        <input className={styles.uploaderInput} id='photo' type="file" accept="image/*" onChange={handleUpload} />
                    </>
                }
            </div>
            <div className={styles.name}>{name}</div>
            <Link to={`/review/${id}`}>Оставить отзыв</Link>
            <Rating rating={5}  onRatingSelected = {() => {}} />
        </div>
    )
}
