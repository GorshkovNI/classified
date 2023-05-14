import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from './Header.module.css';
import { ProfileArea } from "../ProfileArea/ProfileArea";
import { Icon } from "../Icons/Icon";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsAuth, getIsLoading, getUserName } from "../../store/auth/userSelector";
import { Autorization } from "../../Pages/Autorization/Autorization";
import { useEffect } from "react";
export var Header = function (_a) {
    //const [isLoading, setIsLoading] = useState(true)
    var toggleModal = _a.toggleModal, activeTab = _a.activeTab, toggleActiveTab = _a.toggleActiveTab, openModal = _a.openModal, closeModal = _a.closeModal;
    var isLoggedIn = useSelector(getIsAuth);
    var isLoading = useSelector(getIsLoading);
    // useEffect(() => {
    //     setIsLoading(false)
    // }, [isLoggedIn])
    var isName = localStorage.getItem('name');
    console.log(isName, ' ', isLoggedIn);
    return (React.createElement("header", { className: styles.wrapper },
        React.createElement("div", { className: styles.container },
            React.createElement("div", { className: styles.leftSide },
                React.createElement(Button, null, "123")),
            React.createElement("div", { className: styles.rightSide },
                React.createElement("div", { className: styles.assistButton },
                    React.createElement(Icon, { className: cn(styles.button, styles.love), name: 'love' }),
                    React.createElement(Icon, { className: cn(styles.button, styles.cart), name: 'cart' })),
                !isLoggedIn ? React.createElement(Button, { size: 'medium', mode: 'transparent', onClick: toggleModal }, isLoading ? 'Loading...' : 'Вход и регистрация') : React.createElement(ProfileArea, { userName: isName }),
                React.createElement(Link, { className: styles.link, to: '/addItem' },
                    React.createElement(Button, { size: 'medium', mode: 'primary', icon: 'search' }, "\u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435")))),
        React.createElement(Autorization, { activeTab: activeTab, toggleActiveTab: toggleActiveTab, openModal: openModal, closeModal: closeModal })));
};
