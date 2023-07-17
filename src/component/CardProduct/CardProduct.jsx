import React from "react";
import styles from './CardProduct.module.css'
import { Slider } from "../Slider/Slider";
import cn from "classnames";
import { formatMoney } from "../../utils/formatMoney";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFavorites,toggleFavorites } from "../../store/favorites/favoritesSlice";
import { useDispatch } from "react-redux";

export const CardProduct = ({ id , title , city, price, date, photos, up }) => {



    console.log(id)
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.favorites.orders);
    const removeFavorites = () =>dispatch(removeFavorites(id));
    const photo = photos.length > 0 ? photos[0].url : ''
    const addToFavoritesList = () =>dispatch(setFavorites({id, title, price, city, photo}));

    const wrapper = cn(styles.wrapper, {
        [styles.wrapperUp]: up === true
    })

    return (

        <div className={wrapper}  >
            {/*<Link to={`/product-info/${id}`} className={styles.link}>*/}
            {/*{photos.length > 0 &&  <Slider>*/}
            {/*        {photos.map((photo) => {*/}
            {/*             return <div className={cn(styles.item, styles.item1)}><img className={styles.image} src={photo.url} /></div>*/}
            {/*        })}*/}
            {/*    </Slider>}*/}

            {photos.length > 0 &&
                <Link to={`/item/${id}`} className={styles.link}>
                    <Slider photos={photos} />
                </Link>
            }
            {/*</Link>*/}
            <div className={styles.discription}>
                <div className={styles.blockNamed}>
                    <Link to={`/item/${id}`} className={styles.link}>
                        <span className={styles.nameProduct}>{title} </span>
                    </Link>
                    {
                        !(orders.some(element => element.id === id)) ? <i  id = {id} className="bi bi-heart" style={{fontSize: '21px', color: '#009CF0'}} onClick={()=>{addToFavoritesList({id,title,price, city, photo})}}></i>
                        : <i id = {id} className="bi bi-heart-fill" style={{fontSize: '21px', color: 'red'}} onClick={()=>{addToFavoritesList({id,title,price})}}></i>
                    }
                </div>
                <span className={styles.price}>{formatMoney(price)}</span>
                <span className={styles.located}>{city} </span>
                <span className={styles.datePublication}>{date} </span>
            </div>
        </div>


    )
}
