import React, {useState} from "react";
import styles from './ProfileArea.module.css'
import {Icon} from "../Icons/Icon";
import {Dropdown} from "../Dropdown/Dropdown";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../../store/user";
import { getUserName } from "../../store/userSelector";

const menuDropdown = [
    {
        title: 'Мои объявления',
        path: '/moi_obyavlenia'
    },
    {
        title: 'Избранное',
        path: '/izbrannoe'
    },

]

export const ProfileArea = ({userName, icon}) => {

    const [isOpen, setIsOpen] = useState(false)

    //const userName = useSelector(getUserName);

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
        dispath(logout())
    }


    return(
        <div className={styles.wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {icon ? <img className={styles.userIcon} /> : 
                <div className={styles.iconArea}>
                    <span className={styles.icon}>{userName[0].toUpperCase()}</span>
                </div>
            }
            <span className={styles.userName}>{userName}</span>
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
                            </>
                        )
                    })}
                    <span className={styles.text} onClick={handleLogout}>Выйти</span>
                    </div>
                </Dropdown>
            </div>}

        </div>
    )
}