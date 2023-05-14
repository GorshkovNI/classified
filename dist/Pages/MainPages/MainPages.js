import React, { useEffect } from "react";
import styles from "./MainPages.module.css";
import cn from "classnames";
import { Input } from "../../component/Input/Input";
import { Icon } from "../../component/Icons/Icon";
import { CardProduct } from "../../component/CardProduct/CardProduct";
import { Categories } from "../../component/Categories/Categories";
import { Layout } from "../../component/Layout/Layout";
export var MainPages = function (_a) {
    var className = _a.className;
    return (React.createElement(Layout, null,
        React.createElement("div", { className: styles.wrapper },
            React.createElement(Categories, null),
            React.createElement("div", { className: styles.title },
                React.createElement("h3", { className: styles.textRecomendation }, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0432\u0430\u0441")),
            React.createElement("div", { className: styles.productArea },
                React.createElement("div", { className: styles.products },
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null),
                    React.createElement(CardProduct, null)),
                React.createElement("div", { className: styles.infoArea },
                    React.createElement("span", null, "\u0412\u0430\u0448\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0438 \u043F\u043E\u043A\u0443\u043F\u043A\u0438"))))));
};
