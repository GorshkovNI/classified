import React, { useEffect, useState } from 'react';
import { cities } from './cities';
import Select from 'react-select'
import styles from './GeolocatedIcon.module.css'
export const GeolocatedIcon = () => {
    const [city, setCity] = useState(localStorage.getItem("city"));
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
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
        setSelectedOption(selectedOption)
        setCity(selectedOption.name)
        localStorage.setItem("city", selectedOption.name)
        setIsOpen(false)
      };

    return (
        <>
        <div onClick={toggleDropdown} style={{cursor: 'pointer',}}>
        <i style={{ color: 'white', fontSize: '1vw',  marginRight:'5px' }} className="bi bi-compass-fill" >  </i>
        {
            
            city && <span style={{color:'white'}}>{city}</span>
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