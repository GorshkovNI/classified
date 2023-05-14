import React from "react";
import styles from './CardProduct.module.css';
import { Slider } from "../Slider/Slider";
import cn from "classnames";
import { formatMoney } from "../../utils/formatMoney";
import one from './1.jpg';
import two from './2.jpg';
import three from './3.jpg';
import four from './4.jpg';
import { Icon } from "../Icons/Icon";
import { Link } from "react-router-dom";
export var CardProduct = function (_a) {
    var _b = _a.id, id = _b === void 0 ? '3645' : _b, onClick = _a.onClick, title = _a.title, city = _a.city, price = _a.price, date = _a.date;
    return (React.createElement(Link, { to: "/product-info/".concat(id), className: styles.link },
        React.createElement("div", { className: styles.wrapper },
            React.createElement(Slider, null,
                React.createElement("div", { className: cn(styles.item, styles.item1) },
                    React.createElement("img", { className: styles.image, src: one })),
                React.createElement("div", { className: cn(styles.item, styles.item2) },
                    React.createElement("img", { className: styles.image, src: two })),
                React.createElement("div", { className: cn(styles.item, styles.item3) },
                    React.createElement("img", { className: styles.image, src: three }))),
            React.createElement("div", { className: styles.discription },
                React.createElement("div", { className: styles.blockNamed },
                    React.createElement("span", { className: styles.nameProduct },
                        title || 'Клей пва, оптом',
                        " "),
                    React.createElement(Icon, { className: styles.like, name: 'love' })),
                React.createElement("span", { className: styles.price }, formatMoney(5000) || formatMoney(price)),
                React.createElement("span", { className: styles.located },
                    city || 'Екатринбург',
                    " "),
                React.createElement("span", { className: styles.datePublication },
                    date || '26 марта 11:57',
                    " ")))));
};
