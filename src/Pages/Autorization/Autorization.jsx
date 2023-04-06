import React from 'react';
import { Registration } from "./Registration/Registration";
import { SignIn } from "./SignIn/SignIn";

export const Autorization = ({activeTab, toggleActiveTab, openModal, closeModal}) => {
    return (
        <>
            {activeTab === 'registration' && (
                <Registration openModal={openModal} closeModal={closeModal} toggleActiveTab={toggleActiveTab} />
            )}
            {activeTab === 'login' && (
                <SignIn openModal={openModal} closeModal={closeModal} toggleActiveTab={toggleActiveTab} />
            )}

        </>
    );
};
