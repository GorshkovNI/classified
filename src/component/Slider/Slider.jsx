import React, {Children, cloneElement, useEffect, useState} from "react";
import styles from './Slider.module.css'
import cn from 'classnames'
import {Icon} from "../Icons/Icon";

const PAGE_WIDTH = 200

export const Slider = ({children}) => {

    const [pages, setPages] = useState([])
    const [offsetX, setOffsetX] = useState(0)

    const handleClickLeftArrow = () => {
        setOffsetX((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH
            return Math.min(newOffset, 0)
        })
    }

    const handleClickRightArrow = () => {
        setOffsetX((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH
            const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
            return Math.max(newOffset, maxOffset)
        })
    }

    useEffect(()=>{
        setPages(
            Children.map(children, (child) => {
                return cloneElement(child, {
                    style:{
                        height: '100%',
                        minWidth: `${PAGE_WIDTH}px`,
                        maxWidth: `${PAGE_WIDTH}px`
                    }
                })
            })
        )
    }, [])


    return(
        <div className={styles.wrapper}>
            <div className={styles.window}>
                <div className={cn(styles.arrowArea, styles.arrowAreaLeft)} onClick={handleClickLeftArrow}>
                    <Icon className={cn(styles.arrow, styles.arrowLeft)} name='arrow' />
                </div>
                <div className={styles.allPagesContainer} style={ {transform: `translateX(${offsetX}px)`} }>
                    {pages}
                </div>
                <div className={cn(styles.arrowArea, styles.arrowAreaRight)} onClick={handleClickRightArrow}>
                    <Icon className={cn(styles.arrow, styles.arrowRight)} name='arrow' />
                </div>
            </div>
        </div>

    )
}