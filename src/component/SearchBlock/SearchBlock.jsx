import React, { useEffect, useState } from "react";
import styles from './SearchBlock.module.css'
import cn from "classnames";
import { Icon } from "../Icons/Icon";
import { Input } from "../Input/Input";
import logo from './lg.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdsOnRequest } from "./store/searchSlice";

export const SearchBlock = ({ className }) => {

    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleValue = (event) => {
        setValue(event.target.value)
    }


    const [scroll, setScroll] = React.useState(0);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    const findAd = () => {
        if (!value) {
            return
        }
        dispatch(getAdsOnRequest(value))
        navigate(`/search`, { state: { from: location.pathname } })
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [])

    /* if (window.innerWidth <= 801){ */
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll2);
        return () => {
            window.removeEventListener('scroll', handleScroll2);
        };
    }, []);

    const handleScroll2 = () => {
        if (window.innerWidth <= 801) {
            if (window.pageYOffset > 0) {
                setIsHidden(true);
                console.log(isHidden)
            } else {
                setIsHidden(false);
                console.log(isHidden)
            }
        }

    };

    return (
        <div className={cn(styles.wrapper, className,
            scroll > 50 ? styles.borderVisible : ''
        )} >
            <div className={styles.container}>
                {/* <Icon className={styles.logo} name='logo' /> */}
                
                    <Link to={'/'} className="logoLink">
                    {isHidden ? null :<img src={logo} className={styles.logo} />}
                    </Link>
                <div className={styles.searchBlock}>
                    <Input value={value} onChange={handleValue} onClick={findAd} className={styles.input} button buttonText='Trouver' />
                </div>
            </div>

        </div>
    )
}