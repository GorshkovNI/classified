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
var SkeletonLine = function (props) { return (React.createElement(ContentLoader, __assign({ speed: 2, width: 400, height: 25, backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb" }, props),
    React.createElement("rect", { x: "19", y: "0", rx: "2", ry: "2", width: "347", height: "25" }))); };
export default SkeletonLine;
