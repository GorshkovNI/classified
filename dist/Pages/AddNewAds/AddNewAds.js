import React, { useEffect, useState } from "react";
import styles from "./AddNewAds.module.css";
import cn from "classnames";
import { Dropdown } from "../../component/Dropdown/Dropdown";
import { Button } from "../../component/Button/Button";
import { Icon } from "../../component/Icons/Icon";
import { Layout } from "../../component/Layout/Layout";
import { Input } from "../../component/Input/Input";
import { Car } from "./categories/Car/Car";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategoryFields } from "../../store/ad/adSlice";
import { getAllCategories, getAllFieldsCategory, getLoadingAd } from "../../store/ad/adSelector";
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css';
import { Rent } from "./categories/Rent/Rent";
import { getIsAuth } from "../../store/auth/userSelector";
import axios from "axios";
var categoryAd = {
    car: React.createElement(Car, null),
    rent: React.createElement(Rent, null),
};
export var AddNewAds = function () {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useState({}), typeAd = _b[0], setTypeAd = _b[1];
    var _c = useState({}), values = _c[0], setValues = _c[1];
    var dispatch = useDispatch();
    var allCategoies = useSelector(getAllCategories);
    //const fields = useSelector(getAllFieldsCategory)
    var isLoading = useSelector(getLoadingAd);
    var isAuth = useSelector(getIsAuth);
    useEffect(function () {
        dispatch(getCategories());
    }, []);
    useEffect(function () {
        dispatch(getCategoryFields(typeAd.categoryName));
        console.log(typeAd);
    }, [typeAd]);
    // useEffect(() => {
    //     if(fields.length === 0) return
    //     const obj = fields.reduce((acc, item) => {
    //         acc[item.title] = '';
    //         return acc;
    //     }, {});
    //     setValues(obj)
    // }, [fields])
    var handleButtonClick = function () {
        setIsOpen(!isOpen);
    };
    var handleTypeAd = function (e) {
        setTypeAd({
            transtale: e.target.textContent,
            categoryName: e.target.id
        });
        setIsOpen(false);
    };
    return (React.createElement(Layout, { isSearchBlock: false },
        React.createElement("div", { className: styles.wrapper },
            isAuth ?
                React.createElement("div", { className: styles.chooseArea },
                    isLoading ? React.createElement("span", null, "Loading...") : React.createElement(Button, { className: styles.buttonType, onClick: handleButtonClick }, !typeAd.transtale ? 'Выберите категорию' : typeAd.transtale),
                    isOpen && (React.createElement(Dropdown, { className: styles.dropdown },
                        React.createElement("div", { className: styles.type }, allCategoies.map(function (type) {
                            return (React.createElement(React.Fragment, null,
                                React.createElement("span", { className: styles.typeItem, id: type.category, onClick: handleTypeAd }, type.translate)));
                        }))))) : React.createElement("div", null, "\u0421\u043D\u0430\u0447\u0430\u043B\u043E \u043D\u0443\u0436\u043D\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F("),
            typeAd.categoryName && categoryAd[typeAd.categoryName])));
};
