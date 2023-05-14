import React, { useState } from 'react';
import styles from './RadioButton.module.css';
import cn from 'classnames';
export var RadioButton = function (_a) {
    var _b;
    var name = _a.name, value = _a.value, label = _a.label, checked = _a.checked, onChange = _a.onChange, className = _a.className, classNameInput = _a.classNameInput;
    var _c = useState(checked), radioChecked = _c[0], setRadioChecked = _c[1];
    var handleButtonClick = function () {
        setRadioChecked(!radioChecked);
        onChange(value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { id: "".concat(name, "-").concat(value), className: classNameInput, type: "radio", name: name, value: value, checked: radioChecked, onChange: function () { }, style: { display: "none" } }),
        React.createElement("label", { htmlFor: "".concat(name, "-").concat(value) },
            React.createElement("button", { className: cn(styles.button, className, (_b = {},
                    _b[styles.active] = checked === true,
                    _b)), onClick: handleButtonClick }, label))));
};
