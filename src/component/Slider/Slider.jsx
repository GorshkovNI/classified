import React, { useEffect, useState, useRef } from "react";
import styles from './Slider.module.css';
import cn from 'classnames';
import { Icon } from "../Icons/Icon";

const PAGE_WIDTH = 250;
const TRANSITION_DURATION = 300;

export const Slider = ({ photos }) => {
    const [offset, setOffset] = useState(0);
    const [transitionDuration, setTransitionDuration] = useState(TRANSITION_DURATION);

    const windowElRef = useRef();

    useEffect(() => {
        const resizeHandler = () => {
            const windowElWidth = windowElRef.current.offsetWidth;
            const maxOffset = -(PAGE_WIDTH * (photos.length - 1));
            setOffset((currentOffset) => {
                if (currentOffset < maxOffset) {
                    return maxOffset;
                }
                return currentOffset;
            });
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [photos]);

    const handleClickLeftArrow = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOffset((currentOffset) => {
            if (!transitionDuration) {
                setTransitionDuration(TRANSITION_DURATION);
            }
            const newOffset = currentOffset + PAGE_WIDTH;
            return Math.min(newOffset, 0);
        });
    };

    const handleClickRightArrow = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOffset((currentOffset) => {
            if (!transitionDuration) {
                setTransitionDuration(TRANSITION_DURATION);
            }
            const newOffset = currentOffset - PAGE_WIDTH;
            const maxOffset = -(PAGE_WIDTH * (photos.length - 1));
            return Math.max(newOffset, maxOffset);
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.window} ref={windowElRef}>
                <div className={cn(styles.arrowArea, styles.arrowAreaLeft)} onClick={handleClickLeftArrow}>
                    <Icon className={cn(styles.arrow, styles.arrowLeft)} name="arrow" />
                </div>
                <div className={styles.allPagesContainer} style={{ transitionDuration: `${transitionDuration}ms`, transform: `translateX(${offset}px)` }}>
                    {photos.map((photo, index) => (
                        <div key={photo.id} className={styles.slide} style={{ width: `${PAGE_WIDTH}px` }}>
                            <img src={photo.url} alt={`Slide ${index + 1}`} className={styles.slideImage} />
                            {index === Math.floor(photos.length / 2) && <div className={styles.activeIndicator} />}
                        </div>
                    ))}
                </div>
                <div className={cn(styles.arrowArea, styles.arrowAreaRight)} onClick={handleClickRightArrow}>
                    <Icon className={cn(styles.arrow, styles.arrowRight)} name="arrow" />
                </div>
            </div>
        </div>
    );
};
