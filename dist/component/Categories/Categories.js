import React from 'react';
import styles from './Categories.module.css';
export var Categories = function () {
    return (React.createElement("div", { className: styles.wrapper },
        React.createElement("div", { className: styles.categoriesContainer },
            React.createElement("div", { className: styles.categoryColumn },
                React.createElement("div", { className: styles.categoryItem },
                    React.createElement("a", { className: styles.link, href: "/transport" }, "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442")),
                React.createElement("div", { className: styles.categoryItem },
                    React.createElement("a", { className: styles.link, href: "/work" }, "\u0420\u0430\u0431\u043E\u0442\u0430")),
                React.createElement("div", { className: styles.categoryItem },
                    React.createElement("a", { className: styles.link, href: "/housing" }, "\u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C"))),
            React.createElement("div", { className: styles.categoryColumn },
                React.createElement("div", { className: styles.categoryItem },
                    React.createElement("a", { className: styles.link, href: "/electronic" }, "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u0438\u043A\u0430")),
                React.createElement("div", { className: styles.categoryItem },
                    React.createElement("a", { className: styles.link, href: "/accessories" }, "\u0410\u043A\u0441\u0435\u0441\u0441\u0443\u0430\u0440\u044B")),
                React.createElement("div", { className: styles.categoryItem })),
            React.createElement("div", { className: styles.categoryColumn },
                React.createElement("div", { className: styles.categoryItem }),
                React.createElement("div", { className: styles.categoryItem }),
                React.createElement("div", { className: styles.categoryItem })))));
};
