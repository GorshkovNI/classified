import React, {useState} from "react";
import styles from './ProfileArea.module.css'
import {Icon} from "../Icons/Icon";
import {Dropdown} from "../Dropdown/Dropdown";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../../store/auth/userSlice";
import {getPhoto} from "../../store/auth/userSelector";




export const ProfileArea = ({userName, icon}) => {

    const menuDropdown = [
        {
            title: 'Mes annonces',
            path: `profile/${localStorage.getItem('user_id')}`
        },
        // {
        //     title: 'Favoris',
        //     path: '/izbrannoe'
        // },

    ]

    const [isOpen, setIsOpen] = useState(false)

    const avatar = useSelector(getPhoto)

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
            {avatar ? <img className={styles.userIcon} src={avatar} /> :
                <div className={styles.iconArea}>
                    <span className={styles.icon}>{userName && userName[0]?.toUpperCase()}</span>
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
                    <div className={styles.title}>
                        <span className={styles.text} onClick={handleLogout}>Sortir</span>
                    </div>
                    </div>
                </Dropdown>
            </div>}

        </div>
    )
}