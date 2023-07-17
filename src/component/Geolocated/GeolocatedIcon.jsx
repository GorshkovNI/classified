import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { cities } from './cities';
import Select from 'react-select'
import styles from './GeolocatedIcon.module.css'
import {setNewCity} from '../../Pages/MyAds/store/userProfileSlice'
import {setCC} from "../../Pages/MainPages/store/MainPageSlice";

export const GeolocatedIcon = () => {
    const [city, setCity] = useState(localStorage.getItem('city'));
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch()

    const mappedCities = cities.map(city => ({ name: city.name,country:city.country, label: city.country + "/" + city.name }))
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

   /*  useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const { latitude, longitude } = position.coords;
                
                fetch(`https://ipapi.co/${latitude},${longitude}/country/`)
                .then(response => response.text())
                .then(country => setCountry(country));
                
            });
        }
        
    }, []) */
    const handleChange = (selectedOption) => {
        const newCity = selectedOption.name
        setSelectedOption(selectedOption)
        dispatch(setNewCity(newCity))
        dispatch(setCC(newCity))
        setCity(newCity)
        localStorage.setItem("city", newCity)
        setIsOpen(false)
      };

    // useEffect(() => {
    //     if(city){
    //         dispatch(setNewCity(city))
    //     }
    //
    // }, [city])

    return (
        <>
        <div onClick={toggleDropdown} className={styles.geolocatedIcon}>
        <i style={{height:'100%', color: 'white',   marginRight:'0px' }} className="bi bi-geo-alt-fill" >  </i>
        {
            
            city && <span className={styles.nameCity} style={{color:'white'}}>{city}</span>
        }
        </div>
            {isOpen && (
                <div className={styles.select_container}>
                    <Select
                        id="select_city"
                        options={mappedCities}
                        isSearchable={true}
                        placeholder="Search..."
                        onChange={handleChange}
                        
                    />
                </div>

            )}
        </>

    )
}