import React, { useState } from "react";
import styles from './Color.module.css';
import { colorOptions } from './colorOptions';
export var Color = function (_a) {
    var handleColor = _a.handleColor;
    var _b = useState("#ffffff"), selectedColor = _b[0], setSelectedColor = _b[1];
    var _c = useState(''), color = _c[0], setColor = _c[1];
    var handleColorClick = function (color) {
        handleColor(colorOptions.find(function (item) { return item.color === color; }).value);
        setSelectedColor(color);
    };
    return (React.createElement("div", { className: styles.colorsArea }, colorOptions.map(function (option) { return (React.createElement("button", { key: option.value, style: {
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: option.color,
            marginRight: 5,
            border: "2px solid ".concat(option.color === selectedColor ? '#ff8c00' : '#e0e0e0'),
            boxSizing: 'border-box',
            outline: 'none',
            cursor: 'pointer',
        }, onClick: function () { return handleColorClick(option.color); } })); })));
};
