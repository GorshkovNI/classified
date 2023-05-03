import React, {useEffect, useState} from "react";
import styles from './Car.module.css'
import {Input} from "../../../../component/Input/Input";
import axios from "axios";
import {Icon} from "../../../../component/Icons/Icon";
import {RadioButton} from "../../../../component/RadioButton/RadioButton";
import {car} from "./tempJsonCar";
import * as events from "events";
import {Button} from "../../../../component/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {createNewAdd} from "../../../../store/ad/adSlice";
import {isLoadingAd} from "../../../../store/ad/adSelector";
import {Modal} from "../../../../component/Modal/Modal";



export const Car = () => {
    // Характеристики
    const [marks, setMarka] = useState([{}])
    const [selectedMark, setSelectedMark] = useState('')

    const [model, setModel] = useState([{}])
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
    //Флаг на все заполненые поля
    const [isFilled, setiSFilled] = useState(true)
    //Цена и описание
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    //Для модалки
    const isLoading = useSelector(isLoadingAd)
    //const [isOpen, setIsOpen] = useState(isLoading)

    const dispatch = useDispatch()

    const handleSelectedMark = (event) => {
        setSelectedMark(event.target.value)
        setiSFilled(true)
    }

    const handleSelectedModel = (event) => {
        setSelectedModel(event.target.value)
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
        const models = car.find((item) => item.id === selectedMark)
        const allmodels = models?.models.map((item) => {
           return  {
                    id: item.id,
                    model: item.name,
                    year_from: item['year-from'],
                    year_to: item['year-to'],
            }
        })
        setModel(allmodels)

    }, [selectedMark])

    useEffect(() => {
        if(model?.length > 1){
            const currentModel = car.find(item => item.models.some(model => model.id === selectedModel))
            const year_from = currentModel.models.find(model => model.id === selectedModel)['year-from']
            let year_to = currentModel.models.find(model => model.id === selectedModel)['year-to']
            year_to = year_to === null ? new Date().getFullYear() : year_to
            console.log(year_from)
            console.log(year_to)
            const years = []
            for(let i = year_from; i <= year_to; i++){
                years.push(i)
            }
            setYear(years)
        }


    }, [selectedModel])


    function handleUpload(event) {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                //const photo = { id: Date.now(), url: reader.result };
                const photo = reader.result;
                console.log(photo)
                setPhotos([...photos, photo]);
            };
        }
    }

    function handleDelete(id) {
        setPhotos(photos.filter(photo => photo.id !== id));
    }

    const sendInfo = () => {
        setiSFilled(true)
        if(!selectedMark && !selectedModel && !selectedYear && !registrationnubmer && !vin && !color && !mileage && !selectedOwner && !selectedValue){
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
            description: description,
            price: price,
            user_id: localStorage.getItem('user_id')
        }

        dispatch(createNewAdd(newCar))

    }

    return(
        <>
        <Modal isOpen={isLoading} turnOff>
            <Icon name='preloader' />
        </Modal>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.infoArea}>
                        <h3>Технические характеристики</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Марка</span>
                            <select id='marka' className={styles.select} value={selectedMark} onChange={handleSelectedMark}>
                                <option value="">Выберите значение</option>
                                {marks.map((item) => {
                                    return <option value={item.id}>{item.marka}</option>
                                })}
                            </select>
                        </div>
                        { selectedMark &&
                                <div className={styles.infoAreaItem}>
                                    <span>Модель</span>
                                    <select id='model' className={styles.select} value={selectedModel} onChange={handleSelectedModel}>
                                        <option value="">Выберите значение</option>
                                        {model?.map((item) => {
                                            return <option value={item.id}>{item.model}</option>
                                        })}
                                    </select>
                                </div>
                        }
                        { selectedModel &&
                            <div className={styles.infoAreaItem}>
                                <span>Год выпуска</span>
                                <select id='year' className={styles.select} value={selectedYear} onChange={handleSelectedYear}>
                                    <option value="">Выберите значение</option>
                                    {year?.map((item) => {
                                        return <option value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                        }

                    </div>
                    <div className={styles.infoCarItem}>
                        <h3>Регистрационные данные</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Введите ГОС. Номер</span>
                            <input type='text' value={registrationnubmer} onChange={(e) => setRegistrationNumber(e.target.value)} />
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>VIN</span>
                            <input type='text' value={vin} onChange={(e) => setVin(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.infoCarItem}>
                        <h3>Внешний вид</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Цвет</span>
                            <input type='text' value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>Фото</span>
                            <div className={styles.uploader}>
                                <label htmlFor='photo' className={styles.uploaderPhotoLabel}>
                                    {/*{photos.length >= 1 ? <img className={styles.mainPhoto} src={photos[0].url} /> : <Icon name='photo' className={styles.preloaderIcon} />}*/}
                                    <Icon name='photo' className={styles.preloaderIcon} />
                                </label>
                                <input className={styles.uploaderInput} id='photo' type="file" onChange={handleUpload} />
                                <div className={styles.gallery}>
                                    {photos.map(photo => (
                                        <div key={photo.id} className={styles.galleryContainer} >
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
                        <h3>История эксплуатации и состояние</h3>
                        <div className={styles.infoAreaItem}>
                            <span>Пробег</span>
                            <input className={styles.input} type='number' value={mileage} onChange={(e) => setMileage(e.target.value)} />
                            <span className={styles.postscript}>км</span>
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>Состояние</span>
                            <div>
                                <RadioButton className={styles.labelRadio} classNameInput={styles.inputRadio} name="state" value="crash" label="Битая" checked={selectedValue === 'crash'} onChange={handleOptionChange} />
                                <RadioButton className={styles.labelRadio} classNameInput={styles.inputRadio} name="state" value="uncrash" label="Не битая" checked={selectedValue === 'uncrash'} onChange={handleOptionChange} />
                            </div>
                        </div>
                        <div className={styles.infoAreaItem}>
                            <span>Владельцев</span>
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
                            <h3>Цена</h3>
                            <input className={styles.input} type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className={styles.infoAreaItem}>
                            <h3>Описание</h3>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.textarea} placeholder="Опишите ваше авто"></textarea>
                        </div>
                    </div>
                    <Button size='medium' onClick={sendInfo}>Отправить</Button>
                    {!isFilled && <div style={{color: 'var(--hover-red)'}}>Проверьте все поля</div>}
                </div>
            </div>
        </>
    )
}