import React, { useState } from 'react';
import styles from './RadioButton.module.css'
import cn from 'classnames'

export const RadioButton = ({ name, value, label, checked, onChange, className, classNameInput }) => {

    const [radioChecked, setRadioChecked] = useState(checked);

    const handleButtonClick = () => {
        setRadioChecked(!radioChecked);
        onChange(value);
    };

    return (
        <>
            <input
                id={`${name}-${value}`}
                className={classNameInput}
                type="radio"
                name={name}
                value={value}
                checked={radioChecked}
                onChange={() => {}}
                style={{display: "none"}}
            />
            <label htmlFor={`${name}-${value}`}>
                <button
                    className={cn(styles.button, className, {
                        [styles.active]: checked === true
                    })}
                    onClick={handleButtonClick}
                >
                    {label}
                </button>
            </label>
        </>
    );
};