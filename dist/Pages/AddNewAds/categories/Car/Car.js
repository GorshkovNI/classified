var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useRef, useState } from "react";
import styles from './Car.module.css';
import { Input } from "../../../../component/Input/Input";
import axios from "axios";
import { Icon } from "../../../../component/Icons/Icon";
import { RadioButton } from "../../../../component/RadioButton/RadioButton";
import { car } from "./tempJsonCar";
import * as events from "events";
import { Button } from "../../../../component/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createNewAdd, fetchAdDataError } from "../../../../store/ad/adSlice";
import { getError, getLoadingAd, getRedirect } from "../../../../store/ad/adSelector";
import { Modal } from "../../../../component/Modal/Modal";
import { formatMoney } from "./utils/formMoney";
import { Color } from "./components/Color";
import { validateVIN } from "../../../../utils/validateVIN";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import Autocomplete from 'react-autocomplete';
import { cities } from "../../cities/cities";
var cityPlusCountry = cities.map(function (item) {
    return item.name + ' ' + item.country;
});
export var Car = function () {
    // Характеристики
    var _a = useState([{}]), marks = _a[0], setMarka = _a[1];
    var _b = useState(''), selectedMarkId = _b[0], setSelectedMarkId = _b[1];
    var _c = useState(''), selectedMark = _c[0], setSelectedMark = _c[1];
    var _d = useState([{}]), model = _d[0], setModel = _d[1];
    var _e = useState(''), selectedModelId = _e[0], setSelectedModelId = _e[1];
    var _f = useState(''), selectedModel = _f[0], setSelectedModel = _f[1];
    var _g = useState([]), year = _g[0], setYear = _g[1];
    var _h = useState(''), selectedYear = _h[0], setSelectedYear = _h[1];
    // Регистрационные даные
    var _j = useState(''), registrationnubmer = _j[0], setRegistrationNumber = _j[1];
    var _k = useState(''), vin = _k[0], setVin = _k[1];
    // Внешний вид
    var _l = useState([]), photos = _l[0], setPhotos = _l[1];
    var _m = useState(''), color = _m[0], setColor = _m[1];
    // Состояние
    var _o = useState(''), mileage = _o[0], setMileage = _o[1];
    var _p = useState(''), selectedValue = _p[0], setSelectedValue = _p[1];
    var _q = useState(''), selectedOwner = _q[0], setSelectedOwner = _q[1];
    // Флаг на все заполненые поля
    var _r = useState(true), isFilled = _r[0], setiSFilled = _r[1];
    // Цена и описание
    var _s = useState(''), price = _s[0], setPrice = _s[1];
    var _t = useState(''), description = _t[0], setDescription = _t[1];
    var _u = useState(''), correctedDescription = _u[0], setCorrectedDescription = _u[1];
    // Для города
    var _v = useState(''), city = _v[0], setCity = _v[1];
    var _w = useState([]), options = _w[0], setOptions = _w[1];
    // Для модалки
    var isLoading = useSelector(getLoadingAd);
    // Для редиректа
    var redirect = useSelector(getRedirect);
    var location = useLocation();
    var navigate = useNavigate();
    //const [isOpen, setIsOpen] = useState(isLoading)
    // Error
    var isError = useSelector(getError);
    var refTextarea = useRef(null);
    var dispatch = useDispatch();
    var handleSelectedMark = function (event) {
        var selectedIndex = event.target.selectedIndex;
        var selectedOption = event.target.options[selectedIndex];
        var selectedValue = selectedOption.text;
        setSelectedMarkId(event.target.value);
        setSelectedMark(selectedValue);
        setiSFilled(true);
    };
    var handleSelectedModel = function (event) {
        var selectedIndex = event.target.selectedIndex;
        var selectedOption = event.target.options[selectedIndex];
        var selectedValue = selectedOption.text;
        setSelectedModel(selectedValue);
        setSelectedModelId(event.target.value);
        setiSFilled(true);
    };
    var handleSelectedYear = function (event) {
        setSelectedYear(event.target.value);
        setiSFilled(true);
    };
    var handleOptionChange = function (value) {
        setSelectedValue(value);
        setiSFilled(true);
    };
    var handleChangeOwner = function (value) {
        setSelectedOwner(value);
        setiSFilled(true);
    };
    var handleTextArea = function (event) {
        setDescription(event.target.value);
        setCorrectedDescription(event.target.value.replace(/\n/g, '<br/>'));
    };
    var handleColor = function (color) {
        setColor(color);
    };
    useEffect(function () {
        var allMarks = car.map(function (item) {
            return {
                marka: item.name,
                id: item.id
            };
        });
        setMarka(allMarks);
    }, []);
    useEffect(function () {
        var models = car.find(function (item) { return item.id === selectedMarkId; });
        var allmodels = models === null || models === void 0 ? void 0 : models.models.map(function (item) {
            return {
                id: item.id,
                model: item.name,
                year_from: item['year-from'],
                year_to: item['year-to'],
            };
        });
        setModel(allmodels);
    }, [selectedMarkId]);
    useEffect(function () {
        if ((model === null || model === void 0 ? void 0 : model.length) > 1) {
            var currentModel = car.find(function (item) { return item.models.some(function (model) { return model.id === selectedModelId; }); });
            var year_from = currentModel.models.find(function (model) { return model.id === selectedModelId; })['year-from'];
            var year_to = currentModel.models.find(function (model) { return model.id === selectedModelId; })['year-to'];
            year_to = year_to === null ? new Date().getFullYear() : year_to;
            console.log(year_from);
            console.log(year_to);
            var years = [];
            for (var i = year_from; i <= year_to; i++) {
                years.push(i);
            }
            setYear(years);
        }
    }, [selectedModelId]);
    useEffect(function () {
        if (redirect) {
            var userId = localStorage.getItem('user_id');
            navigate("/profile/".concat(userId), { state: { from: location.pathname } });
        }
    }, [redirect]);
    function handleUpload(event) {
        var file = event.target.files[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(file);
            reader_1.onload = function () {
                //const photo = { id: Date.now(), url: reader.result };
                var photo = reader_1.result;
                console.log(photo);
                setPhotos(__spreadArray(__spreadArray([], photos, true), [photo], false));
            };
        }
    }
    function handleDelete(id) {
        setPhotos(photos.filter(function (photo) { return photo.id !== id; }));
    }
    var sendInfo = function () {
        //setiSFilled(true)
        if (!selectedMarkId || !selectedModelId || !selectedYear || !registrationnubmer || !vin || !color || !mileage || !selectedOwner || !selectedValue) {
            setiSFilled(false);
            return;
        }
        var pictures = new FormData();
        if (photos.length > 0) {
            for (var i = 0; i < photos.length; i++) {
                pictures.append('images', photos[i]);
            }
        }
        var newCar = {
            title: "".concat(selectedMark, " ").concat(selectedModel, " ").concat(selectedYear),
            category: 'car',
            marka: selectedMark,
            model: selectedModel,
            year: selectedYear,
            registrationnubmer: registrationnubmer,
            vin: vin,
            color: color,
            mileage: mileage,
            owners: selectedOwner,
            isCrash: selectedValue,
            photos: photos,
            description: correctedDescription,
            price: price,
            city: city,
            user_id: localStorage.getItem('user_id')
        };
        dispatch(createNewAdd(newCar));
    };
    var closeModal = function () {
        dispatch(fetchAdDataError());
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { isOpen: isLoading, turnOff: !isError ? true : false, onClose: closeModal }, !isError ? React.createElement(Icon, { name: 'preloader' }) : React.createElement("div", null, " \u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437 \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u0447\u0443\u0442\u044C \u043F\u043E\u0437\u0436\u0435")),
        React.createElement("div", { className: styles.wrapper },
            React.createElement("div", { className: styles.info },
                React.createElement("div", { className: styles.infoArea },
                    React.createElement("h3", null, "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438"),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u041C\u0430\u0440\u043A\u0430"),
                        React.createElement("select", { id: 'marka', className: styles.select, value: selectedMarkId, onChange: handleSelectedMark },
                            React.createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"),
                            marks.map(function (item) {
                                return React.createElement("option", { value: item.id }, item.marka);
                            }))),
                    selectedMarkId &&
                        React.createElement("div", { className: styles.infoAreaItem },
                            React.createElement("span", null, "\u041C\u043E\u0434\u0435\u043B\u044C"),
                            React.createElement("select", { id: 'model', className: styles.select, value: selectedModelId, onChange: handleSelectedModel },
                                React.createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"), model === null || model === void 0 ? void 0 :
                                model.map(function (item) {
                                    return React.createElement("option", { value: item.id }, item.model);
                                }))),
                    selectedModelId &&
                        React.createElement("div", { className: styles.infoAreaItem },
                            React.createElement("span", null, "\u0413\u043E\u0434 \u0432\u044B\u043F\u0443\u0441\u043A\u0430"),
                            React.createElement("select", { id: 'year', className: styles.select, value: selectedYear, onChange: handleSelectedYear },
                                React.createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"), year === null || year === void 0 ? void 0 :
                                year.map(function (item) {
                                    return React.createElement("option", { value: item }, item);
                                })))),
                React.createElement("div", { className: styles.infoCarItem },
                    React.createElement("h3", null, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435"),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0413\u041E\u0421. \u041D\u043E\u043C\u0435\u0440"),
                        React.createElement("input", { type: 'text', value: registrationnubmer, onChange: function (e) { return setRegistrationNumber(e.target.value); } })),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "VIN"),
                        React.createElement("input", { type: 'text', value: vin, maxLength: 17, onChange: function (event) {
                                setVin(event.target.value.toUpperCase());
                            }, style: { border: "1px solid ".concat((vin.length === 17 && !validateVIN(vin)) ? 'red' : 'black') } }))),
                React.createElement("div", { className: styles.infoCarItem },
                    React.createElement("h3", null, "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434"),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u0426\u0432\u0435\u0442"),
                        React.createElement(Color, { handleColor: handleColor })),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u0424\u043E\u0442\u043E"),
                        React.createElement("div", { className: styles.uploader },
                            React.createElement("label", { htmlFor: 'photo', className: styles.uploaderPhotoLabel },
                                React.createElement(Icon, { name: 'photo', className: styles.preloaderIcon })),
                            React.createElement("input", { className: styles.uploaderInput, id: 'photo', type: "file", onChange: handleUpload }),
                            React.createElement("div", { className: styles.gallery }, photos.map(function (photo, index) { return (React.createElement("div", { key: index, className: styles.galleryContainer },
                                React.createElement("img", { src: photo, alt: "uploaded", width: "70", height: "70" }),
                                React.createElement(Icon, { name: 'close', className: styles.closePhoto, onClick: function () { return handleDelete(photo.id); } }))); }))))),
                React.createElement("div", { className: styles.infoCarItem },
                    React.createElement("h3", null, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u0438 \u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435"),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u041F\u0440\u043E\u0431\u0435\u0433"),
                        React.createElement("input", { className: styles.input, type: 'number', value: mileage, onChange: function (e) { return setMileage(e.target.value); } }),
                        React.createElement("span", { className: styles.postscript }, "\u043A\u043C")),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435"),
                        React.createElement("div", null,
                            React.createElement(RadioButton, { className: styles.labelRadio, classNameInput: styles.inputRadio, name: "state", value: "crash", label: "\u0411\u0438\u0442\u0430\u044F", checked: selectedValue === 'crash', onChange: handleOptionChange }),
                            React.createElement(RadioButton, { className: styles.labelRadio, classNameInput: styles.inputRadio, name: "state", value: "uncrash", label: "\u041D\u0435 \u0431\u0438\u0442\u0430\u044F", checked: selectedValue === 'uncrash', onChange: handleOptionChange }))),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("span", null, "\u0412\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u0432"),
                        React.createElement("div", null,
                            React.createElement(RadioButton, { className: styles.ownersInput, classNameInput: styles.inputRadio, name: "owner", value: "1", checked: selectedOwner === "1", label: "1", onChange: handleChangeOwner }),
                            React.createElement(RadioButton, { className: styles.ownersInput, classNameInput: styles.inputRadio, name: "owner", value: "2", checked: selectedOwner === "2", label: "2", onChange: handleChangeOwner }),
                            React.createElement(RadioButton, { className: styles.ownersInput, classNameInput: styles.inputRadio, name: "owner", value: "3", checked: selectedOwner === "3", label: "3", onChange: handleChangeOwner }),
                            React.createElement(RadioButton, { className: styles.ownersInput, classNameInput: styles.inputRadio, name: "owner", value: "4+", checked: selectedOwner === "4+", label: "4+", onChange: handleChangeOwner })))),
                React.createElement("div", { className: styles.infoCarItem },
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("h3", null, "\u0426\u0435\u043D\u0430"),
                        React.createElement("input", { type: 'text', value: formatMoney(price), onChange: function (e) { return setPrice(e.target.value); } })),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("h3", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
                        React.createElement("textarea", { ref: refTextarea, value: description, onChange: handleTextArea, className: styles.textarea, placeholder: "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0430\u0432\u0442\u043E" })),
                    React.createElement("div", { className: styles.infoAreaItem },
                        React.createElement("h3", null, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434"),
                        React.createElement("input", { value: city, name: "city", list: "cities", onChange: function (e) { return setCity(e.target.value); } }),
                        React.createElement("datalist", { id: "cities" }, cityPlusCountry.map(function (item) {
                            return (React.createElement("option", null, item));
                        })))),
                React.createElement(Button, { size: 'medium', onClick: sendInfo }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"),
                !isFilled && React.createElement("div", { style: { color: 'var(--hover-red)' } }, "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F")))));
};
