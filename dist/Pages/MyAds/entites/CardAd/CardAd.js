import * as React from "react";
import styles from './CardAd.module.css';
import { Link } from "react-router-dom";
import { formatMoney } from "../../../../utils/formatMoney";
export var CardAd = function (_a) {
    var deleteAd = _a.deleteAd, id = _a.id, description = _a.description, photos = _a.photos, price = _a.price, title = _a.title, categoryId = _a.categoryId, city = _a.city;
    return (React.createElement("div", { className: styles.container, id: id },
        React.createElement("div", { className: styles.containerPhoto },
            React.createElement("img", { className: styles.images, src: photos[0] })),
        React.createElement("div", { className: styles.containerInfo },
            React.createElement("div", { className: styles.infoItems },
                React.createElement("h3", { className: styles.titleArea },
                    React.createElement(Link, { className: styles.title, to: "/ad/".concat(id) }, title)),
                React.createElement("div", { className: styles.priceArea },
                    React.createElement("span", { className: styles.price }, formatMoney(price))),
                React.createElement("div", { className: styles.locatedArea },
                    React.createElement("span", { className: styles.located }, city)))),
        React.createElement("div", { className: styles.delete, onClick: function () { return deleteAd(categoryId, id); } }, "X")));
};
