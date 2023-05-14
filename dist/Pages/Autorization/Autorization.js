import React from 'react';
import { Registration } from "./Registration/Registration";
import { SignIn } from "./SignIn/SignIn";
export var Autorization = function (_a) {
    var activeTab = _a.activeTab, toggleActiveTab = _a.toggleActiveTab, openModal = _a.openModal, closeModal = _a.closeModal;
    return (React.createElement(React.Fragment, null,
        activeTab === 'registration' && (React.createElement(Registration, { openModal: openModal, closeModal: closeModal, toggleActiveTab: toggleActiveTab })),
        activeTab === 'login' && (React.createElement(SignIn, { openModal: openModal, closeModal: closeModal, toggleActiveTab: toggleActiveTab }))));
};
