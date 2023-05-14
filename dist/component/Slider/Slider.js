var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { Children, cloneElement, useEffect, useState, useRef } from "react";
import styles from './Slider.module.css';
import cn from 'classnames';
import { Icon } from "../Icons/Icon";
var PAGE_WIDTH = 250;
var TRANSITION_DURATION = 300;
export var Slider = function (_a) {
    var children = _a.children;
    var _b = useState([]), pages = _b[0], setPages = _b[1];
    var _c = useState(0), offset = _c[0], setOffset = _c[1];
    var _d = useState({ head: 0, tail: 0 }), clonesCount = _d[0], setClonesCount = _d[1];
    var _e = useState(300), transitionDuration = _e[0], setTransitionDuration = _e[1];
    var windowElRef = useRef();
    useEffect(function () {
        setPages(__spreadArray(__spreadArray([
            cloneElement(children[Children.count(children) - 1])
        ], children, true), [
            cloneElement(children[0]), // tail: 1
        ], false));
        setClonesCount({ head: 1, tail: 1 });
        return;
    }, [children]);
    useEffect(function () {
        var resizeHandler = function () {
            var windowElWidth = windowElRef.current.offsetWidth;
            //setWidth(windowElWidth)
            setOffset(-(clonesCount.head * PAGE_WIDTH)); // to prevent wrong offset
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return function () {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [clonesCount, PAGE_WIDTH]);
    useEffect(function () {
        if (transitionDuration === 0) {
            setTimeout(function () {
                setTransitionDuration(TRANSITION_DURATION);
            }, TRANSITION_DURATION);
        }
    }, [transitionDuration]);
    useEffect(function () {
        // с элемента 0 (clone) -> к предпоследнему (реальный)
        if (offset === 0) {
            setTimeout(function () {
                setTransitionDuration(0);
                setOffset(-(PAGE_WIDTH * (pages.length - 1 - clonesCount.tail)));
            }, TRANSITION_DURATION);
            return;
        }
        // с элемента n (clone) -> к элементу 1 (реальный)
        if (offset === -(PAGE_WIDTH * (pages.length - 1))) {
            setTimeout(function () {
                setTransitionDuration(0);
                setOffset(-(clonesCount.head * PAGE_WIDTH));
            }, TRANSITION_DURATION);
            return;
        }
    }, [offset, pages, clonesCount, PAGE_WIDTH]);
    var handleClickLeftArrow = function (e) {
        e.stopPropagation();
        e.preventDefault();
        setOffset(function (currentOffset) {
            if (!transitionDuration) {
                setTransitionDuration(TRANSITION_DURATION);
            }
            var newOffset = currentOffset + PAGE_WIDTH;
            return Math.min(newOffset, 0);
        });
    };
    var handleClickRightArrow = function (e) {
        e.stopPropagation();
        e.preventDefault();
        setOffset(function (currentOffset) {
            if (!transitionDuration) {
                setTransitionDuration(TRANSITION_DURATION);
            }
            var newOffset = currentOffset - PAGE_WIDTH;
            var maxOffset = -(PAGE_WIDTH * (pages.length - 1));
            return Math.max(newOffset, maxOffset);
        });
    };
    return (React.createElement("div", { className: styles.wrapper },
        React.createElement("div", { className: styles.window, ref: windowElRef },
            React.createElement("div", { className: cn(styles.arrowArea, styles.arrowAreaLeft), onClick: handleClickLeftArrow },
                React.createElement(Icon, { className: cn(styles.arrow, styles.arrowLeft), name: 'arrow' })),
            React.createElement("div", { className: styles.allPagesContainer, style: { transitionDuration: "".concat(transitionDuration, "ms"), transform: "translateX(".concat(offset, "px)") } }, pages),
            React.createElement("div", { className: cn(styles.arrowArea, styles.arrowAreaRight), onClick: handleClickRightArrow },
                React.createElement(Icon, { className: cn(styles.arrow, styles.arrowRight), name: 'arrow' })))));
};
