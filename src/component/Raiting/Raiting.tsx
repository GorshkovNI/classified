import React, { useState } from 'react';
import styles from './Raiting.module.css';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const Rating = ({ rating, staticMode = true, onRatingSelected }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);

    const handleMouseEnter = (index) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (index) => {
        setSelectedRating(index);
        onRatingSelected(index)
    };

    return (
        <div className={styles.ratingArea}>
            <span className={styles.numberRating}>{staticMode ? rating : selectedRating}</span>
            {[1, 2, 3, 4, 5].map((index) => {
                const isFullStar = staticMode ? rating : hoverRating >= index;
                const isHalfStar = staticMode ? rating : hoverRating >= index - 0.5 && rating < index;

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
