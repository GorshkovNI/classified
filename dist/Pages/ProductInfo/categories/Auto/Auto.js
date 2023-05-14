import React from "react";
import styles from './Auto.module.css';
export var Auto = function (_a) {
    var data = _a.data;
    console.log(data);
    return (React.createElement("ul", { className: styles.parametrsList },
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u041C\u0430\u0440\u043A\u0430: "),
            data.marka),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u041C\u043E\u0434\u0435\u043B\u044C: "),
            data.model),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u0413\u043E\u0434 \u0432\u044B\u043F\u0443\u0441\u043A\u0430: "),
            data.year),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u041F\u0440\u043E\u0431\u0435\u0433: "),
            data.mileage,
            " \u043A\u043C"),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u0412\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u0432:  "),
            data.owners),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u041F\u0440\u0438\u0432\u043E\u0434:  "),
            "\u041F\u043E\u043B\u043D\u044B\u0439"),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0430\u0446\u0438\u044F:  "),
            "\u0411\u0430\u0437\u043E\u0432\u0430\u044F"),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u0422\u0438\u043F \u043A\u0443\u0437\u043E\u0432\u0430:  "),
            "\u0423\u043D\u0438\u0432\u0435\u0440\u0441\u0430\u043B"),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "\u0426\u0432\u0435\u0442:  "),
            data.color),
        React.createElement("li", { className: styles.itemUl },
            React.createElement("span", { className: styles.item }, "VIN \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u043A\u0443\u0437\u043E\u0432\u0430:  "),
            data.vin)));
};
