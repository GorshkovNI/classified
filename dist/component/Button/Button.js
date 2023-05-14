var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { Icon } from "../Icons/Icon";
import styles from './Button.module.css';
import cn from 'classnames';
var buttonTypes = {
    primary: 'primary',
    transparent: 'transparent',
    outlined: 'outlined',
    contained: 'contained'
};
export var Button = function (_a) {
    var _b;
    var size = _a.size, _c = _a.mode, mode = _c === void 0 ? 'primary' : _c, type = _a.type, onClick = _a.onClick, children = _a.children, className = _a.className, props = __rest(_a, ["size", "mode", "type", "onClick", "children", "className"]);
    var buttonClassName = cn(styles.button, (_b = {},
        _b[styles.primary] = mode === buttonTypes.primary,
        _b[styles.transparent] = mode === buttonTypes.transparent,
        _b[styles.outlined] = mode === buttonTypes.outlined,
        _b[styles.contained] = mode === buttonTypes.contained,
        _b[styles.medium] = size === 'medium',
        _b[styles.small] = size === 'small',
        _b), className);
    return (React.createElement("button", { className: buttonClassName, onClick: onClick, type: type },
        React.createElement(Icon, { name: props.icon, className: cn(styles.buttonIcon, props.classNameIcon) }),
        children));
};
