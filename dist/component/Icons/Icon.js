import React from 'react';
import { iconsTypes } from './Icon/IconType';
export var Icon = function (_a) {
    var name = _a.name, className = _a.className, onClick = _a.onClick;
    var IconComponent = iconsTypes[name];
    return IconComponent ? React.createElement(IconComponent, { className: className, onClick: onClick }) : null;
};
