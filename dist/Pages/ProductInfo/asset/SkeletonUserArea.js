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
var SkeletonUserArea = function (props) { return (React.createElement(ContentLoader, __assign({ speed: 2, width: 400, height: 460, viewBox: "100 60 400 460", backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb" }, props),
    React.createElement("rect", { x: "108", y: "96", rx: "2", ry: "2", width: "140", height: "10" }),
    React.createElement("rect", { x: "108", y: "70", rx: "2", ry: "2", width: "140", height: "16" }),
    React.createElement("rect", { x: "109", y: "122", rx: "0", ry: "0", width: "139", height: "8" }),
    React.createElement("circle", { cx: "375", cy: "95", r: "25" }))); };
export default SkeletonUserArea;
