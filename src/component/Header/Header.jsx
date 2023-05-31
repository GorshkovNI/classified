import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from './Header.module.css'
import { ProfileArea } from "../ProfileArea/ProfileArea";
import { Icon } from "../Icons/Icon";
import cn from 'classnames'
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { getIsAuth, getIsLoading, getUserName } from "../../store/auth/userSelector";
import { Autorization } from "../../Pages/Autorization/Autorization";
import { FavoritesModal } from "../../Pages/FavoritesModal/FavoritesModal";
import { useEffect } from "react";
import { GeolocatedIcon } from "../Geolocated/GeolocatedIcon";
import {Modal} from "../Modal/Modal";
import {getFavorites} from "../../store/favorites/favoriteSelector";
import {CardAd} from "../../Pages/MyAds/entites/CardAd/CardAd";
import {Overlay} from "../Overlay/Overlay";
import {CardReview} from "../../Pages/MyAds/component/CardReview/CardReview";

export const Header = ({
    toggleModal,
    activeTab,
    toggleActiveTab,
    openModal,
    closeModal,
    showFavoriteModal,
    showFavorites,
    orders,
    removeToFavoritesList }) => {

    const isLoggedIn = useSelector(getIsAuth)
    const isLoading = useSelector(getIsLoading)
    const favorites = useSelector(getFavorites)
    const navigate = useNavigate()
    console.log(favorites)

    // useEffect(() => {
    //     setIsLoading(false)
    // }, [isLoggedIn])

    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModel = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const handleRedireсt = (event) => {
        navigate(`/item/${event.currentTarget.id}`)
    }

    const isName = localStorage.getItem('name')
    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Link to="/" style={{ textDecoration: "none" }}><Button size='medium' mode='transparent'>{/* <i className="bi bi-building"></i> */}Principal</Button></Link>
                    <Link to="/about" style={{ textDecoration: "none" }}><Button size='medium' mode='transparent'>{/* <i className="bi bi-building"></i> */}À propos de nous</Button></Link>
                    {/* <Link to="/feedback" style={{ textDecoration: "none" }}><Button size='medium' mode='primary'><i className="bi bi-building"></i> Feedback</Button></Link>*/}
                </div>




                <div className={styles.rightSide}>
                
                    <div>
                        <GeolocatedIcon/>
                    </div>
                    <div className={styles.assistButton}>
                        <Icon className={cn(styles.button, styles.love)} name='love' onClick={handleOpenModel} />
                        {/* <Icon className={cn(styles.button, styles.cart)} name='cart' /> */}
                    </div>
                    {!isLoggedIn ? <Button size='medium' mode='transparent' onClick={toggleModal} >{isLoading ? 'Loading...' : 'Connexion et inscription'}</Button> : <ProfileArea userName={isName} />}
                    <Link className={styles.link} to={'/addItem'}>
                        <Button size='medium' mode='primary'  >Déposer une annonce</Button>
                    </Link>
                </div>
            </div>
            {isOpen && <Overlay closeOverlay={handleCloseModal}>
                {favorites.length > 0 ? favorites.map((item) => {
                    return <CardReview adObj={item} getId={handleRedireсt} />
                }) : <span>Vous n'avez rien ajouté à vos favoris</span>}
            </Overlay>}
            <Autorization activeTab={activeTab} toggleActiveTab={toggleActiveTab} openModal={openModal} closeModal={closeModal} />
        </header>
    )

}