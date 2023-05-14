import * as React from "react";
import styles from './ProfileInfo.module.css';
import { useState } from "react";
export var ProfileInfo = function (_a) {
    var _b = _a.id, id = _b === void 0 ? '1' : _b, name = _a.name;
    var _c = useState(''), photo = _c[0], setPhoto = _c[1];
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.avatarArea }, photo ? React.createElement("img", { src: photo }) : React.createElement("div", { className: styles.secondAvatar }, name[0])),
        React.createElement("div", { className: styles.name }, name)));
};
