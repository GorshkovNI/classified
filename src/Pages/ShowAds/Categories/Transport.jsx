import React, { useState,  useEffect } from "react";
import {car} from '../../../Pages/AddNewAds/categories/Car/tempJsonCar'
import styles from './Transport.module.css'


export const Transport = ({selectedMarkId, selectedModelId, selectedYearTo, selectedYearFrom, handleSelectedYearTo, handleSelectedYearFrom, handleSelectedMark, handleSelectedModel}) => {

    const [marks, setMarka] = useState([{}])
    const [model, setModel] = useState([{}])
    const [year, setYear] = useState([])


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
            const currentModel = car.find(item => item.models?.some(model => model.id === selectedModelId))
            const year_from = currentModel?.models?.find(model => model.id === selectedModelId)['year-from']
            let year_to = currentModel?.models?.find(model => model.id === selectedModelId)['year-to']
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


    return(
        <div className={styles.container}>
            <h4 className={styles.title}>Marque</h4>
            <select className={styles.select} id='marka'  value={selectedMarkId} onChange={handleSelectedMark}>
               <option value="">Choisissez une valeur</option>
                {marks.map((item) => {
                     return <option value={item.id}>{item.marka}</option>
                })}
            </select>
            <h4 className={styles.title}>Modèle</h4>
            <select id='model'  value={selectedModelId} onChange={handleSelectedModel}>
                <option value="">Choisissez une valeur</option>
                {model?.map((item) => {
                    return <option value={item.id}>{item.model}</option>
                })}
            </select>

            <h4 className={styles.title}>Année</h4>
            <div className={styles.yearContainer}>
                <select id='year' className={styles.select} value={selectedYearTo} onChange={handleSelectedYearTo}>
                    <option value="">Depuis</option>
                    {year?.map((item) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>
                <select id='year' className={styles.select} value={selectedYearFrom} onChange={handleSelectedYearFrom}>
                    <option value="">Avant</option>
                    {year?.map((item) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>
            </div>
        </div>
        
    )
}