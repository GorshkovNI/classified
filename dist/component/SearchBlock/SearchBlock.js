import React, { useEffect } from "react";
import styles from './SearchBlock.module.css';
import cn from "classnames";
import { Icon } from "../Icons/Icon";
import { Input } from "../Input/Input";
import logo from './lg.png';
import { Link } from "react-router-dom";
export var SearchBlock = function (_a) {
    var className = _a.className;
    var _b = React.useState(0), scroll = _b[0], setScroll = _b[1];
    var handleScroll = function () {
        setScroll(window.scrollY);
    };
    useEffect(function () {
        window.addEventListener("scroll", handleScroll);
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    return (React.createElement("div", { className: cn(styles.wrapper, className, scroll > 50 ? styles.borderVisible : '') },
        React.createElement("div", { className: styles.container },
            React.createElement(Link, { to: '/' },
                React.createElement("img", { src: logo, className: styles.logo })),
            React.createElement("div", { className: styles.searchBlock },
                React.createElement(Input, { className: styles.input, button: true, buttonText: '\u041D\u0430\u0439\u0442\u0438' })))));
};
