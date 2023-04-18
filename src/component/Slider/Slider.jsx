import React, {Children, cloneElement, useEffect, useState, useRef} from "react";
import styles from './Slider.module.css'
import cn from 'classnames'
import {Icon} from "../Icons/Icon";

const PAGE_WIDTH = 250
const TRANSITION_DURATION = 300

export const Slider = ({children}) => {

    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const [clonesCount, setClonesCount] = useState({head: 0, tail: 0})
    const [transitionDuration, setTransitionDuration] = useState(300)

    const windowElRef = useRef()

    useEffect(() => {
        setPages([
          cloneElement(children[Children.count(children)-1]), // head: 1
          ...children,
          cloneElement(children[0]), // tail: 1
        ])
        setClonesCount({ head: 1, tail: 1 })
        return
    }, [children])
  
    useEffect(() => {
      const resizeHandler = () => {
        const windowElWidth = windowElRef.current.offsetWidth
        console.log('resized', windowElWidth)
        //setWidth(windowElWidth)
        setOffset(-(clonesCount.head * PAGE_WIDTH)) // to prevent wrong offset
      }
  
      resizeHandler()
      window.addEventListener('resize', resizeHandler)
  
      return () => {
        window.removeEventListener('resize', resizeHandler)
      }
    }, [clonesCount, PAGE_WIDTH])
  
    useEffect(() => {
      if (transitionDuration === 0) {
        setTimeout(() => {
          setTransitionDuration(TRANSITION_DURATION)
        }, TRANSITION_DURATION)
      }
    }, [transitionDuration])
  
    useEffect(() => {
  
      // с элемента 0 (clone) -> к предпоследнему (реальный)
      if (offset === 0) {
        setTimeout(() => {
          setTransitionDuration(0)
          setOffset(-(PAGE_WIDTH * (pages.length - 1 - clonesCount.tail)))
        }, TRANSITION_DURATION)
        return
      }
      // с элемента n (clone) -> к элементу 1 (реальный)
      if (offset === -(PAGE_WIDTH * (pages.length - 1))) {
        setTimeout(() => {
          setTransitionDuration(0)
          setOffset(-(clonesCount.head * PAGE_WIDTH))
        }, TRANSITION_DURATION)
        return
      }
    }, [offset, pages, clonesCount, PAGE_WIDTH])

    const handleClickLeftArrow = () => {
        setOffset((currentOffset) => {
            if (!transitionDuration) {
                setTransitionDuration(TRANSITION_DURATION);
              }
            const newOffset = currentOffset + PAGE_WIDTH
            return Math.min(newOffset, 0)
        })
    }

    const handleClickRightArrow = () => {
        console.log(pages);
        setOffset((currentOffset) => {
            if (!transitionDuration) {
                setTransitionDuration(TRANSITION_DURATION);
              }
            const newOffset = currentOffset - PAGE_WIDTH
            const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
            return Math.max(newOffset, maxOffset)
        })
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.window} ref={windowElRef}>
                <div className={cn(styles.arrowArea, styles.arrowAreaLeft)} onClick={handleClickLeftArrow}>
                    <Icon className={cn(styles.arrow, styles.arrowLeft)} name='arrow' />
                </div>
                <div className={styles.allPagesContainer} style={ {transitionDuration: `${transitionDuration}ms` , transform: `translateX(${offset}px)`} }>
                    {pages}
                </div>
                <div className={cn(styles.arrowArea, styles.arrowAreaRight)} onClick={handleClickRightArrow}>
                    <Icon className={cn(styles.arrow, styles.arrowRight)} name='arrow' />
                </div>
            </div>
        </div>

    )
}