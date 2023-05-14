import React from "react";
import { Header } from "../Header/Header.jsx";
import { SearchBlock } from "../SearchBlock/SearchBlock.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
export var Layout = function (_a) {
    var children = _a.children, _b = _a.isSearchBlock, isSearchBlock = _b === void 0 ? true : _b;
    var _c = useState(false), isOpenSignUp = _c[0], setIsOpenSignUp = _c[1];
    var _d = useState('login'), activeTab = _d[0], setActiveTab = _d[1];
    var dispath = useDispatch();
    var toggleActiveTab = function (active) {
        setActiveTab(active);
    };
    var toggleModal = function () {
        setIsOpenSignUp(!isOpenSignUp);
        document.body.classList.add("modal-open");
    };
    var closeModal = function () {
        setIsOpenSignUp(false);
        document.body.classList.remove("modal-open");
    };
    return (React.createElement("div", null,
        React.createElement(Header, { toggleModal: toggleModal, activeTab: activeTab, toggleActiveTab: toggleActiveTab, openModal: isOpenSignUp, closeModal: closeModal }),
        isSearchBlock && React.createElement(SearchBlock, null),
        children));
};
