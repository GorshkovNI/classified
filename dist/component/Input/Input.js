import React from "react";
import styles from './Input.module.module.css';
import { Button } from "../Button/Button";
import cn from 'classnames';
export var Input = function (_a) {
    var _b;
    var className = _a.className, placeholder = _a.placeholder, name = _a.name, _c = _a.type, type = _c === void 0 ? 'text' : _c, id = _a.id, value = _a.value, onChange = _a.onChange, button = _a.button, buttonText = _a.buttonText, incorrect = _a.incorrect;
    var inputClassname = cn(styles.container, className, (_b = {},
        _b[styles.incorrect] = incorrect,
        _b));
    return (React.createElement("div", { className: inputClassname },
        React.createElement("div", { className: styles.area },
            React.createElement("input", { className: styles.input, type: type, placeholder: placeholder, onChange: onChange, value: value, id: id, name: name })),
        React.createElement("div", { className: styles.buttonArea }, button && React.createElement(Button, { mode: 'transparent', className: styles.button }, buttonText))));
};
