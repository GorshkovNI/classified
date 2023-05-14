import React from 'react';
import styles from './Dropdown.module.css';
import cn from 'classnames';
export var Dropdown = function (_a) {
    var className = _a.className, children = _a.children;
    return (React.createElement("div", { className: cn(styles.dropdown, className) },
        React.createElement("div", { className: styles.list },
            React.createElement("div", { className: styles.item }, children))));
};
