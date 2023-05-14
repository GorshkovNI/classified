import React, {useState} from "react";
import styles from './Color.module.css'
import {colorOptions} from './colorOptions'

export const Color = ({handleColor}) => {

    const [selectedColor, setSelectedColor] = useState("#ffffff");
    const [color, setColor] = useState('')

    const handleColorClick = (color) => {
        handleColor(colorOptions.find(item => item.color === color).value)
        setSelectedColor(color);
    };

    return(
            <div className={styles.colorsArea}>
                {colorOptions.map((option) => (
                    <button
                        key={option.value}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            backgroundColor: option.color,
                            marginRight: 5,
                            border: `2px solid ${option.color === selectedColor ? '#ff8c00' : '#e0e0e0'}`,
                            boxSizing: 'border-box',
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleColorClick(option.color)}
                    />
                ))}
            </div>
    )
}