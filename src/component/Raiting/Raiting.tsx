import React from "react";
import styles from './Raiting.module.css'
import { useState } from 'react';
import {FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const Rating = ({ rating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (index) => {
        // Handle rating selection
    };

    return (
        <div className={styles.ratingArea}>
            <span className={styles.numberRating}>{rating}</span>
            {[1, 2, 3, 4, 5].map((index) => {
                const isFullStar = rating >= index;
                const isHalfStar = rating >= index - 0.5 && rating < index;

                return (
                    <span
                        key={index}
                        className={styles.rating}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
            {isFullStar ? (
                <FaStar className={styles.starIcon} />
            ) : isHalfStar ? (
                <FaStarHalfAlt className={styles.starIcon} />
            ) : (
                <FaRegStar />
            )}
          </span>
                );
            })}
        </div>
    );
};