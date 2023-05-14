import * as React from 'react';
import styles from './UserAds.module.css';
import { Layout } from '../../component/Layout/Layout';
import { CardAd } from "./entites/CardAd/CardAd";
import { ProfileInfo } from "./entites/ProfileInfo/ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteAd, getProfileInfo } from "./store/userProfileSlice";
import { getAds, getEmptyData, getIsLoading } from "./store/userProfileSelector";
import MyLoader from "./entites/CardAd/SkeletonCard/Skeleton";
import { getUserName } from "../../store/auth/userSelector";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
var notify = function () {
    toast.success('Успешно удалено', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
export var UserAds = function () {
    var _a = useState(false), showToast = _a[0], setShowToast = _a[1];
    var handleDelete = function (categoryId, id) {
        dispatch(deleteAd(categoryId, id));
        setShowToast(true);
        notify();
    };
    var dispatch = useDispatch();
    var ads = useSelector(getAds);
    var isLoading = useSelector(getIsLoading);
    var isEmpty = useSelector(getEmptyData);
    var name = useSelector(getUserName);
    console.log(ads);
    useEffect(function () {
        dispatch(getProfileInfo());
    }, []);
    return (React.createElement(Layout, { isSearchBlock: false },
        React.createElement("div", { className: styles.wrapper },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.userArea },
                    React.createElement(ProfileInfo, { id: '1', name: name })),
                React.createElement("div", null,
                    React.createElement("h3", null, "\u041C\u043E\u0438 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F"),
                    React.createElement("div", { className: styles.adsAres }, !isLoading ? (ads.length !== 0 ? (ads.map(function (item) { return (React.createElement(CardAd, { deleteAd: handleDelete, key: item['_id'], id: item['_id'], description: item.description, photos: item.photos, price: item.price, title: item.title, categoryId: item.categoryId, city: item.city })); })) : (React.createElement("div", null, "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043D\u044B\u0445 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439"))) : (React.createElement(MyLoader, null)))))),
        showToast && React.createElement(ToastContainer, { position: "top-center", autoClose: 2000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true, theme: "light" })));
};
