import React, {useState} from "react";
import styles from './ProfileArea.module.css'
import {Icon} from "../Icons/Icon";
import {Dropdown} from "../Dropdown/Dropdown";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";

const menuDropdown = [
    {
        title: 'Мои объявления',
        path: '/moi_obyavlenia'
    },
    {
        title: 'Избранное',
        path: '/izbrannoe'
    },
    ,
    // {
    //     title: 'Выйти',
    //     path: '/logout'
    // },

]

export const ProfileArea = () => {

    const [isOpen, setIsOpen] = useState(false)
    const dispath = useDispatch()

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleLogout = async () => {
        try {
            await axios.get('/logout')
        }
        catch (e){
            console.log(e)
        }
    }


    return(
        <div className={styles.wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img className={styles.userIcon} />
            <span className={styles.userName}>Nikita</span>
            <Icon className={styles.arrow} name='arrow' />
            {isOpen && <div className={styles.dropdownArea}>
                <Dropdown className={styles.dropdown}>
                    <div className={styles.links}>
                        {menuDropdown.map((item) => {
                        return(
                            <>
                                <Link className={styles.title} to={'/' + `${item.path}`}>
                                    <span className={styles.text}>{item.title}</span>
                                </Link>
                                <span className={styles.text} onClick={handleLogout}>Выйти</span>
                            </>
                        )
                    })}
                    </div>
                </Dropdown>
            </div>}

        </div>
    )
}