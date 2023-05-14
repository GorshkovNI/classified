import React, { useRef } from 'react';
import styles from './Modal.module.css';
import { Icon } from "../Icons/Icon";
export var Modal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, children = _a.children, _b = _a.turnOff, turnOff = _b === void 0 ? false : _b;
    var handleOverlayClick = function (event) {
        if (event.target.classList.contains([styles.overlay])) {
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: styles.modal },
        React.createElement("div", { className: styles.overlay, onClick: turnOff ? function () { } : handleOverlayClick },
            React.createElement("div", { className: styles.content },
                turnOff ? null : React.createElement(Icon, { className: styles.closeButton, onClick: onClose, name: 'close' }),
                children))));
};
