var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState } from "react";
import { Modal } from "../../../component/Modal/Modal";
import styles from "./SignIn.module.css";
import { Button } from "../../../component/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, removeInvalidLogging, setAuth, } from "../../../store/auth/userSlice";
import { Input } from "../../../component/Input/Input";
import { getInvalidLogging, getIsLoading, } from "../../../store/auth/userSelector";
import { Icon } from "../../../component/Icons/Icon";
import { useEffect } from "react";
export var SignIn = function (_a) {
    var openModal = _a.openModal, closeModal = _a.closeModal, toggleActiveTab = _a.toggleActiveTab;
    var _b = useState(), email = _b[0], setEmail = _b[1];
    var _c = useState(), password = _c[0], setPassword = _c[1];
    var dispatch = useDispatch();
    var isLoading = useSelector(getIsLoading);
    var isLoggedIn = useSelector(getInvalidLogging);
    var handleLogin = function (event) {
        setEmail(event.target.value);
        dispatch(removeInvalidLogging());
    };
    var handlePassword = function (event) {
        setPassword(event.target.value);
        dispatch(removeInvalidLogging());
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            dispatch(login(email, password));
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        if (!isLoggedIn && !isLoading) {
            closeModal();
        }
    }, [isLoading]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { isOpen: openModal, onClose: closeModal }, isLoading ? (React.createElement(Icon, { name: "preloader", className: styles.preloader })) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.form },
                React.createElement("h2", { className: styles.title }, "\u0412\u0445\u043E\u0434"),
                React.createElement("div", { className: styles.formGroup },
                    React.createElement("label", { className: styles.label, htmlFor: "login" }, "Email"),
                    React.createElement(Input, { className: styles.input, value: email, onChange: handleLogin, type: "email", id: "email", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u0447\u0442\u0443", incorrect: isLoggedIn })),
                React.createElement("div", { className: styles.formGroup },
                    React.createElement("label", { className: styles.label, htmlFor: "password" }, "\u041F\u0430\u0440\u043E\u043B\u044C"),
                    React.createElement(Input, { className: styles.input, value: password, onChange: handlePassword, type: "password", id: "password", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", incorrect: isLoggedIn })),
                isLoggedIn && (React.createElement("span", { className: styles.invalidText }, "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C!")),
                React.createElement(Button, { className: styles.submitButton, size: "medium", type: "submit", onClick: handleSubmit }, "\u0412\u043E\u0439\u0442\u0438")),
            React.createElement("div", { className: styles.toggleArea },
                React.createElement("h3", null, "\u0415\u0449\u0435 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 ?"),
                React.createElement("button", { className: styles.toggleButton, onClick: function () { return toggleActiveTab("registration"); } }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F")))))));
};
