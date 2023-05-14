var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import ContentLoader from "react-content-loader";
var MyLoader = function (props) { return (React.createElement(ContentLoader, __assign({ speed: 2, width: 400, height: 460, viewBox: "0 0 400 460", backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb" }, props),
    React.createElement("rect", { x: "220", y: "140", rx: "2", ry: "2", width: "180", height: "10" }),
    React.createElement("rect", { x: "220", y: "70", rx: "2", ry: "2", width: "180", height: "50" }),
    React.createElement("rect", { x: "22", y: "66", rx: "0", ry: "0", width: "180", height: "180" }),
    React.createElement("rect", { x: "220", y: "160", rx: "0", ry: "0", width: "180", height: "8" }))); };
export default MyLoader;
