import React, {useState} from 'react';
import styles from './Registration.module.css'
import {Modal} from "../../../component/Modal/Modal";
import {Button} from "../../../component/Button/Button";

export const Registration = ({openModal, closeModal, toggleActiveTab}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
        closeModal();
    };

    return (
        <>
            <Modal isOpen={openModal} onClose={closeModal}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Регистрация</h2>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Пароль</label>
                        <input className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" required />
                    </div>
                    {/*<button className={styles.submitButton} type="submit">Зарегистрироваться</button>*/}
                    <Button className={styles.submitButton} size='medium' type='submit'>Зарегистрироваться</Button>
                </form>
                <div className={styles.toggleArea}>
                    <h3>Уже есть аккаунт на  ?</h3>
                    <button className={styles.toggleButton} onClick={() => toggleActiveTab('login')}>Войти</button>
                </div>
            </Modal>
        </>
    );
};
