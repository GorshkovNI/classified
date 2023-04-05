import React, {useEffect} from "react";
import styles from './SearchBlock.module.css'
import cn from "classnames";
import {Icon} from "../Icons/Icon";
import {Input} from "../Input/Input";

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
                <Icon className={styles.logo} name='logo' />
                <div className={styles.searchBlock}>
                    <Input className={styles.input} />
                </div>
            </div>

        </div>
    )
}