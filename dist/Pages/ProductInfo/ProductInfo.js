import * as React from "react";
import styles from "./ProductInfo.module.css";
import ImageGallery from "react-image-gallery";
import { Layout } from "../../component/Layout/Layout";
import { Button } from "../../component/Button/Button";
import { formatMoney } from "../../utils/formatMoney";
import cn from 'classnames';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getState } from "./store/ProductInfoSelector";
import { useEffect } from "react";
import { fetchProductById } from "./store/ProductInfoSlice";
import SkeletonUserArea from "./asset/SkeletonUserArea";
import SkeletonLine from "./asset/SkeletonTitle";
import { Auto } from "./categories/Auto/Auto";
var four = require('./4.jpg');
export var ProductInfo = function () {
    var _a;
    var id = useParams().id;
    var dispatch = useDispatch();
    useEffect(function () {
        dispatch(fetchProductById(id));
    }, []);
    var product = useSelector(getState);
    var isLoading = useSelector(getIsLoading);
    var typeAD = {
        car: React.createElement(Auto, { data: product })
    };
    var images = [
        {
            original: four,
            thumbnail: four,
            originalClass: styles.images,
            thumbnailClass: styles.thumbImage,
        },
    ];
    var photos = product.photos.map(function (item) {
        return {
            original: item,
            thumbnail: item,
            originalClass: styles.images,
            thumbnailClass: styles.thumbImage,
        };
    });
    var description = product.description.split('<br/>').map(function (paragraph, index) {
        return (React.createElement("p", { key: index }, paragraph));
    });
    return (React.createElement(Layout, null,
        React.createElement("div", { className: styles.wrapper },
            React.createElement("div", { className: styles.itemView },
                React.createElement("div", { className: styles.itemNavigation }),
                React.createElement("div", { className: styles.itemContent },
                    React.createElement("div", { className: styles.itemContent_left },
                        React.createElement("div", { className: styles.titleInfoMain },
                            React.createElement("div", null,
                                React.createElement("h1", { className: styles.titleInfo }, isLoading ?
                                    React.createElement("div", { className: styles.skeletonTitle },
                                        React.createElement(SkeletonLine, null))
                                    : product.productName)),
                            React.createElement("div", { className: styles.titleActions },
                                React.createElement(Button, { className: styles.actionButton, size: 'small', mode: "outlined", type: 'text', icon: 'love', classNameIcon: styles.buttonIconLove, onClick: function () { } }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"))),
                        React.createElement("div", { className: styles.viewMainContent },
                            React.createElement(ImageGallery, { items: photos, showPlayButton: false, showFullscreenButton: false, additionalClass: styles.gallery })),
                        React.createElement("div", { className: styles.descriptionBlock },
                            React.createElement("div", { className: styles.parametrs },
                                React.createElement("h2", { className: styles.parametrsSpan }, "\u0413\u043E\u0440\u043E\u0434"),
                                React.createElement("span", { className: styles.city }, product.city)),
                            React.createElement("div", { className: styles.parametrs },
                                React.createElement("h2", { className: styles.parametrsSpan }, "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438"),
                                typeAD[product.category]),
                            React.createElement("div", { className: styles.parametrs },
                                React.createElement("h2", { className: styles.parametrsSpan }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
                                React.createElement("div", { className: styles.description }, description)))),
                    React.createElement("div", { className: styles.itemContent_right },
                        React.createElement("div", { className: styles.priceBlock },
                            React.createElement("h1", { className: styles.price }, !isLoading ? formatMoney(product.price) : React.createElement(SkeletonLine, { width: '200' }))),
                        React.createElement("div", { className: styles.remouteArea },
                            React.createElement(Button, { className: cn(styles.remouteButton, styles.remouteButtonCall), size: 'medium', mode: "contained", type: 'text', onClick: function () { } }, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0435\u043B\u0435\u0444\u043E\u043D"),
                            React.createElement(Button, { className: cn(styles.remouteButton, styles.remouteButtonMessage), size: 'medium', mode: "contained", type: 'text', onClick: function () { } }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435")),
                        React.createElement("div", { className: styles.infoSeller }, isLoading ? React.createElement(SkeletonUserArea, null) :
                            React.createElement(React.Fragment, null,
                                React.createElement("div", { className: styles.descriptionSeller },
                                    React.createElement("span", { className: styles.userName }, product.nameSeller),
                                    React.createElement("span", { className: styles.rating }, "5,0"),
                                    React.createElement("span", { className: styles.time }, 'На гетит с ' + product.dateRegistration + ' года')),
                                React.createElement("div", { className: styles.iconArea },
                                    React.createElement("span", { className: styles.icon }, (_a = product === null || product === void 0 ? void 0 : product.nameSeller[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()))))))))));
};
