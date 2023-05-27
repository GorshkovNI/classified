import React, {useEffect, useRef, useState} from "react";
import styles from './Car.module.css'
import {Input} from "../../../../component/Input/Input";
import axios from "axios";
import {Icon} from "../../../../component/Icons/Icon";
import {RadioButton} from "../../../../component/RadioButton/RadioButton";
import {car} from "./tempJsonCar";
import * as events from "events";
import {Button} from "../../../../component/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {createNewAdd, fetchAdDataError} from "../../../../store/ad/adSlice";
import {getError, getLoadingAd, getRedirect} from "../../../../store/ad/adSelector";
import {Modal} from "../../../../component/Modal/Modal";
import {formatMoney} from "../utils/formMoney";
import {Color} from "./components/Color";
import {validateVIN} from "../../../../utils/validateVIN";
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import Autocomplete from 'react-autocomplete'
import {cities} from "../../cities/cities";

const cityPlusCountry = cities.map((item) => {
    return item.name + ' ' + item.country
})

export const Car = ({dataOfEdit}) => {
    // Характеристики
    const [marks, setMarka] = useState([{}])
    const [selectedMarkId, setSelectedMarkId] = useState('')
    const [selectedMark, setSelectedMark] = useState('')

    const [model, setModel] = useState([{}])
    const [selectedModelId, setSelectedModelId] = useState('')
    const [selectedModel, setSelectedModel] = useState('')

    const [year, setYear] = useState([])
    const [selectedYear, setSelectedYear] = useState('')

    // Регистрационные даные
    const [registrationnubmer, setRegistrationNumber] = useState('')
    const [vin, setVin] = useState('')
    // Внешний вид
    const [photos, setPhotos] = useState([]);
    const [color, setColor] = useState('')
    // Состояние
    const [mileage, setMileage] = useState('')
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');
    // Флаг на все заполненые поля
    const [isFilled, setiSFilled] = useState(true)
    // Цена и описание
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [correctedDescription, setCorrectedDescription] = useState('')
    // Для города
    const [city, setCity] = useState('');
    const [options, setOptions] = useState([]);

    // Для модалки
    const isLoading = useSelector(getLoadingAd)
    // Для редиректа
    const redirect = useSelector(getRedirect)
    const location = useLocation()
    const navigate = useNavigate()
    //const [isOpen, setIsOpen] = useState(isLoading)
    // Error
    const isError = useSelector(getError)

    const refTextarea = useRef(null)

    const dispatch = useDispatch()


    const handleSelectedMark = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        const selectedValue = selectedOption.text;

        setSelectedMarkId(event.target.value)
        setSelectedMark(selectedValue)
        setiSFilled(true)
    }

    const handleSelectedModel = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        const selectedValue = selectedOption.text;

        setSelectedModel(selectedValue)
        setSelectedModelId(event.target.value)
        setiSFilled(true)
    }

    const handleSelectedYear = (event) => {
        setSelectedYear(event.target.value)
        setiSFilled(true)
    }

    const handleOptionChange = (value) => {
        setSelectedValue(value);
        setiSFilled(true)
    };

    const handleChangeOwner = (value) => {
        setSelectedOwner(value)
        setiSFilled(true)
    };

    const handleTextArea = (event) => {
        setDescription(event.target.value)
        setCorrectedDescription(event.target.value.replace(/\n/g, '<br/>'))
    }

    const handleColor = (color) => {
        setColor(color)
    }

    useEffect(() => {
        const allMarks = car.map((item) => {
            return {
                marka: item.name,
                id: item.id
            }
        })
        setMarka(
            allMarks
        )
    }, [])

    useEffect(() => {
        const models = car.find((item) => item.id === selectedMarkId)
        const allmodels = models?.models.map((item) => {
           return  {
                    id: item.id,
                    model: item.name,
                    year_from: item['year-from'],
                    year_to: item['year-to'],
            }
        })
        setModel(allmodels)

    }, [selectedMarkId])

    useEffect(() => {
        if(model?.length > 1){
            const currentModel = car.find(item => item.models.some(model => model.id === selectedModelId))
            const year_from = currentModel.models.find(model => model.id === selectedModelId)['year-from']
            let year_to = currentModel.models.find(model => model.id === selectedModelId)['year-to']
            year_to = year_to === null ? new Date().getFullYear() : year_to
            console.log(year_from)
            console.log(year_to)
            const years = []
            for(let i = year_from; i <= year_to; i++){
                years.push(i)
            }
            setYear(years)
        }


    }, [selectedModelId])

    useEffect(() => {
        if(redirect){
            const userId = localStorage.getItem('user_id')
            navigate(`/profile/${userId}`, { state: { from: location.pathname } })
        }
    }, [redirect])

    function handleUpload(event) {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                const photo = { id: Date.now(), url: reader.result };
                //const photo = reader.result;
                console.log(photo)
                setPhotos([...photos, photo]);
            };
        }
    }

    function handleDelete(id) {
        setPhotos(photos.filter(photo => photo.id !== id));
    }

    const sendInfo = () => {
        //setiSFilled(true)
        if(!selectedMarkId || !selectedModelId || !selectedYear || !registrationnubmer || !vin || !color || !mileage || !selectedOwner || !selectedValue){
            setiSFilled(false)
            return
        }

        const pictures = new FormData()
        if(photos.length > 0){
            for(let i = 0; i < photos.length; i++){
                pictures.append('images', photos[i])
            }
        }

        const newCar = {
            title: `${selectedMark} ${selectedModel} ${selectedYear}`,
            category: 'car',
            marka: selectedMark,
            model: selectedModel,
            year: selectedYear,
            registrationnubmer: registrationnubmer,
            vin: vin,
            color: color,
            mileage: mileage,
            owners: selectedOwner,
            isCrash: selectedValue,
            photos,
            description: correctedDescription,
            price: price,
            city: city,
            user_id: localStorage.getItem('user_id')
        }

        dispatch(createNewAdd(newCar))
    }

    const closeModal = () => {
        dispatch(fetchAdDataError())
    }


    return(
        <>
        <Modal isOpen={isLoading} turnOff={!isError ? true : false} onClose={closeModal}>
            {!isError ? <Icon name='preloader' /> : <div>Une erreur est survenue. Veuillez réessayer ou télécharger l'annonce plus tard</div>}
        </Modal>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.infoArea}>
                        <h3>Caractéristiques</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Marque</span>
                            <select id='marka' className={styles.select} value={selectedMarkId} onChange={handleSelectedMark}>
                                <option value="">Choisissez une valeur</option>
                                {marks.map((item) => {
                                    return <option value={item.id}>{item.marka}</option>
                                })}
                            </select>
                        </div>
                        { selectedMarkId &&
                                <div className={styles.infoAreaItem}>
                                    <span>Modèle</span>
                                    <select id='model' className={styles.select} value={selectedModelId} onChange={handleSelectedModel}>
                                        <option value="">Choisissez une valeur</option>
                                        {model?.map((item) => {
                                            return <option value={item.id}>{item.model}</option>
                                        })}
                                    </select>
                                </div>
                        }
                        { selectedModelId &&
                            <div className={styles.infoAreaItem}>
                                <span>Année d'émission</span>
                                <select id='year' className={styles.select} value={selectedYear} onChange={handleSelectedYear}>
                                    <option value="">Choisissez une valeur</option>
                                    {year?.map((item) => {
                                        return <option value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                        }

                    </div>
                    <div className={styles.infoCarItem}>
                        <h3>Données d'enregistrement</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Entrez le numéro d'état</span>
                            <input type='text' value={registrationnubmer} onChange={(e) => setRegistrationNumber(e.target.value)} />
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>VIN</span>
                            <input type='text'
                                   value={vin}
                                   maxLength={17}
                                   onChange={(event) => {
                                       setVin(event.target.value.toUpperCase());
                                   }}
                                   style={{ border: `1px solid ${(vin.length === 17 && !validateVIN(vin)) ? 'red' : 'black'}`}}
                            />

                        </div>
                    </div>
                    <div className={styles.infoCarItem}>
                        <h3>Apparence</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Couleur</span>
                            {/*<input type='text' value={color} onChange={(e) => setColor(e.target.value)} />*/}
                            <Color handleColor={handleColor}  />

                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>Photo</span>
                            <div className={styles.uploader}>
                                <label htmlFor='photo' className={styles.uploaderPhotoLabel}>
                                    {/*{photos.length >= 1 ? <img className={styles.mainPhoto} src={photos[0].url} /> : <Icon name='photo' className={styles.preloaderIcon} />}*/}
                                    <Icon name='photo' className={styles.preloaderIcon} />
                                </label>
                                <input className={styles.uploaderInput} id='photo' type="file" onChange={handleUpload} />
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
                    </div>
                    <div className={styles.infoCarItem}>
                        <h3>Historique et état de fonctionnement</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Kilométrage</span>
                            <input className={styles.input} type='number' value={mileage} onChange={(e) => setMileage(e.target.value)} />
                            <span className={styles.postscript}>km</span>
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>État</span>
                            <div>
                                <RadioButton className={styles.labelRadio} classNameInput={styles.inputRadio} name="state" value="crash" label="Battu" checked={selectedValue === 'crash'} onChange={handleOptionChange} />
                                <RadioButton className={styles.labelRadio} classNameInput={styles.inputRadio} name="state" value="uncrash" label="Pas battu" checked={selectedValue === 'uncrash'} onChange={handleOptionChange} />
                            </div>
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>Les propriétaires</span>
                            <div>
                                <RadioButton className={styles.ownersInput} classNameInput={styles.inputRadio} name="owner" value="1" checked={selectedOwner === "1"} label="1" onChange={handleChangeOwner} />
                                <RadioButton className={styles.ownersInput} classNameInput={styles.inputRadio} name="owner" value="2" checked={selectedOwner === "2"} label="2" onChange={handleChangeOwner} />
                                <RadioButton className={styles.ownersInput} classNameInput={styles.inputRadio} name="owner" value="3" checked={selectedOwner === "3"} label="3" onChange={handleChangeOwner} />
                                <RadioButton className={styles.ownersInput} classNameInput={styles.inputRadio} name="owner" value="4+" checked={selectedOwner === "4+"} label="4+" onChange={handleChangeOwner} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoCarItem}>
                        <div className={styles.infoAreaItem}>
                            <h3>Prix, MRU</h3>
                            <input type='text' value={formatMoney(price)} onChange={(e) => setPrice(e.target.value)}  />
                        </div>
                        <div className={styles.infoAreaItem}>
                            <h3>Description</h3>
                            <textarea ref={refTextarea} value={description} onChange={handleTextArea} className={styles.textarea} placeholder="Décrivez votre voiture"></textarea>
                        </div>
                        <div className={styles.infoAreaItem}>
                            <h3>Choisissez la ville</h3>
                            <input value={city} name="city" list="cities" onChange={(e) => setCity(e.target.value)}/>
                            <datalist id="cities">
                                {cityPlusCountry.map((item) => {
                                    return(<option>{item}</option>)
                                })}
                            </datalist>
                        </div>
                    </div>
                    <Button size='medium' onClick={sendInfo}>Envoyer</Button>
                    {!isFilled && <div style={{color: 'var(--hover-red)'}}>Vérifier tous les champs</div>}
                </div>
            </div>
        </>
    )
}