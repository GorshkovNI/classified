import React, {useEffect, useState} from "react";
import styles from './Rent.module.css'
import {useForm} from "react-hook-form";
import {cities} from "../../cities/cities";
import {Icon} from "../../../../component/Icons/Icon";
import {createNewAdd, fetchAdDataError} from "../../../../store/ad/adSlice";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from 'redux-thunk';
import {Modal} from "../../../../component/Modal/Modal";
import {getError, getLoadingAd, getRedirect} from "../../../../store/ad/adSelector";
import {useLocation, useNavigate} from "react-router-dom";


type DispatchType = ThunkDispatch<any, any, any>;

const cityPlusCountry = cities.map((item) => {
    return item.name + ' ' + item.country
})

export const Rent = () => {

    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('')
    const [correctedDescription, setCorrectedDescription] = useState('')

    const isLoading = useSelector(getLoadingAd)
    const isError = useSelector(getError)

    const dispatch:DispatchType = useDispatch()

    // Для редиректа
    const redirect = useSelector(getRedirect)
    const location = useLocation()
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm();

    const onSubmit = (data) => {
        data["title"] = `Flat ${data.rooms} rooms ${data.square}`
        data['category'] =  'rent'
        data["user_id"] = localStorage.getItem("user_id")
        data["description"] = correctedDescription
        console.log(JSON.stringify(data));
        dispatch(createNewAdd(data))
    }

    function handleUpload(event) {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            let newPhoto = []
            reader.readAsDataURL(file);
            reader.onload = () => {
                const photo = { id: Date.now(), url: reader.result };
                //const photo = reader.result;
                setPhotos([...photos, photo]);
                newPhoto = [...photos, photo]
                setValue("photos", newPhoto)
            };
        }
    }

    function handleDelete(id) {
        setPhotos(photos.filter(photo => photo.id !== id));
    }

    const handleTextArea = (event) => {
        setDescription(event.target.value)
        setCorrectedDescription(event.target.value.replace(/\n/g, '<br/>'))
    }

    const closeModal = () => {
        dispatch(fetchAdDataError())
    }

    useEffect(() => {
        if(redirect){
            const userId = localStorage.getItem('user_id')
            navigate(`/profile/${userId}`, { state: { from: location.pathname } })
        }
    }, [redirect])

    return(
        <>
            <Modal isOpen={isLoading} turnOff={!isError ? true : false} onClose={closeModal}>
                {!isError ? <Icon name='preloader' className={styles.preloader} onClick={() => {}} /> : <div> Une erreur est survenue. Veuillez réessayer ou télécharger l'annonce plus tard</div>}
            </Modal>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.infoBlock}>
                        <h3>Emplacement</h3>
                        <div className={styles.info}>
                            <span>Adresse</span>
                            <input
                                {...register("city", {
                                    required: true
                                })}
                                list="cities"
                            />
                            <datalist id="cities">
                                {cityPlusCountry.map((item:any) => {
                                    return(<option>{item}</option>)
                                })}
                            </datalist>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>A propos de l'appartement</h3>
                        <div className={styles.info}>
                            <span>Nombre de chambres</span>
                            <input
                                {...register("rooms", {
                                    required: true
                                })}
                                type='number'
                            />
                        </div>
                        <div className={styles.info}>
                            <span>Superficie totale</span>
                            <input
                                {...register("square", {
                                    required: true
                                })}
                                type='number'
                            />
                            <span className={styles.until}>m²</span>
                        </div>
                        <div className={styles.info}>
                            <span>Coin cuisine</span>
                            <input
                                {...register("squareKitchen", {
                                    required: true
                                })}
                                type='number'
                            />
                            <span className={styles.until}>m²</span>
                        </div>
                        <div className={styles.info}>
                            <span>Sol</span>
                            <input
                                {...register("floor", {
                                    required: true
                                })}
                                type='number'
                            />
                        </div>
                        <div className={styles.info}>
                            <span>Total des étages</span>
                            <input
                                {...register("totalFloor", {
                                    required: true
                                })}
                                type='number'
                            />
                        </div>
                        <div className={styles.info}>
                            <span>Salle de bains</span>
                            <input
                                {...register("bathroom", {
                                    required: true
                                })}
                                list="bathroom"
                            />
                            <datalist id="bathroom">
                                <option>Combiné</option>
                                <option>Séparé</option>
                            </datalist>
                        </div>
                        <div className={styles.info}>
                            <span>Prix</span>
                            <input
                                {...register('price', {
                                })}
                            />

                            <datalist id="bathroom">
                                <option>Combiné</option>
                                <option>Séparé</option>
                            </datalist>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <div className={styles.info}>
                            <span>Photo</span>
                            <div className={styles.uploader}>
                                <label htmlFor='photos' className={styles.uploaderPhotoLabel}>
                                    {/*{photos.length >= 1 ? <img className={styles.mainPhoto} src={photos[0].url} /> : <Icon name='photo' className={styles.preloaderIcon} />}*/}
                                    <Icon name='photo' className={styles.preloaderIcon} onClick={() =>{}} />
                                </label>
                                <input className={styles.uploaderInput} id='photos' type="file" multiple {...register("photos")} onChange={handleUpload} />
                                <div className={styles.gallery}>
                                    {photos.map((photo, index) => (
                                        <div key={index} className={styles.galleryContainer} >
                                            <img src={photo.url} alt="uploaded" width="70" height="70" />
                                            <Icon name='close' className={styles.closePhoto} onClick={() => handleDelete(photo.id)} />
                                            {/*<button className={styles.closePhoto} onClick={() => handleDelete(photo.id)}>Delete</button>*/}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <span>Description</span>
                            <textarea value={description} onChange={handleTextArea} className={styles.textarea} placeholder="Décrivez votre voiture"></textarea>
                        </div>
                    </div>
                    <input type='submit' />
                </form>
            </div>
        </>
    )
}