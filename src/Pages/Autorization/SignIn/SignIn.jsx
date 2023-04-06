import React, {useState} from 'react';
import {Modal} from "../../../component/Modal/Modal";
import styles from "./SignIn.module.css";
import {Button} from "../../../component/Button/Button";
import {useDispatch} from "react-redux";
import {fetchData, loginUser} from "../../../store/login/selector";
import axios from "axios";
import {loginFailure, loginStart, loginSucces} from "../../../store/login/sliceLogin";
import {api} from "../../../api/api";

export const SignIn = ({openModal, closeModal, toggleActiveTab}) => {

    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const handleLogin = (event) => {
        setLogin(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //dispatch(loginUser({login, password}))

        try{
            dispatch(loginStart())
            const res = await axios.post('/login', {login: login, password: password})
            console.log(res);
            dispatch(loginSucces(res.data.accessToken))
        }

        catch(error){
            console.error(error)
            dispatch(loginFailure(error.message))
            }
        //closeModal();
    };

    return (
        <>
            <Modal isOpen={openModal} onClose={closeModal}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Вход</h2>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="login">Email</label>
                        <input className={styles.input} value={login} onChange={handleLogin} type="login" id="email" placeholder='Введите почту' />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Пароль</label>
                        <input className={styles.input} value={password} onChange={handlePassword} type="password" id="password" placeholder='Введите пароль' />
                    </div>
                    {/*<button className={styles.submitButton} type="submit">Зарегистрироваться</button>*/}
                    <Button className={styles.submitButton} size='medium' type='submit'>Войти</Button>
                </form>
                <div className={styles.toggleArea}>
                    <h3>Еще нет аккаунта на ?</h3>
                    <button className={styles.toggleButton} onClick={() => toggleActiveTab('registration')}>Зарегистрироваться</button>
                </div>
            </Modal>
        </>
    );
};

