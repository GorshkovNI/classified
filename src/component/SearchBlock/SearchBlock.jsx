import React, {useEffect} from "react";
import styles from './SearchBlock.module.css'
import cn from "classnames";
import {Icon} from "../Icons/Icon";
import {Input} from "../Input/Input";
import logo from './lg.png'
import {Link} from "react-router-dom";

export const SearchBlock = ({className}) => {

    const [scroll, setScroll] = React.useState(0);
    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[])


    return(
        <div className={cn(styles.wrapper, className,
                scroll > 50 ? styles.borderVisible : ''
            )}>
            <div className={styles.container}>
                {/* <Icon className={styles.logo} name='logo' /> */}
                <Link to={'/'}>
                    <img src={logo} className={styles.logo}  />
                </Link>
                <div className={styles.searchBlock}>
                    <Input className={styles.input} button buttonText='Найти' />
                </div>
            </div>

        </div>
    )
}