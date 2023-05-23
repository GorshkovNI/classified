import React, { useState } from "react";
import styles from "./Registration.module.css";
import { Modal } from "../../../component/Modal/Modal";
import { Button } from "../../../component/Button/Button";
import { useDispatch, useSelector } from "react-redux";

import { validateEmail } from "../../../utils/checkValidEmail";
import { Input } from "../../../component/Input/Input";
import { getIsLoading } from "../../../store/auth/userSelector";
import { Icon } from "../../../component/Icons/Icon";
import { useNavigate } from 'react-router-dom'
import { registration } from "../../../store/auth/userSlice";
import {toast, ToastContainer} from "react-toastify";

const WRONG_NAME_LENGTH = "Имя должно быть больше 2 символов";
const WRONG_FORMAT_EMAIL = "Неверный формат email";
const WRONG_FORMAT_PASSWORD = "Длина пароля должна быть больше 3 символов";

export const Registration = ({ openModal, closeModal, toggleActiveTab }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidValueForm, setInvalidForm] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading)

  const navigate = useNavigate()
  //const isLoading = true


  const handleLogin = (e) => {
    setName(e.target.value)
    setInvalidForm('')
  }
  
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setInvalidForm('')
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
    setInvalidForm('')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setInvalidForm('')
  }

  const sendData = async (name, email, password) => {
    if (String(name).length< 3) {
      setInvalidForm(WRONG_NAME_LENGTH);
      return;
    }
    if (!validateEmail(email)) {
        console.log(email)
      setInvalidForm(WRONG_FORMAT_EMAIL);
      return;
    }
    if (password.length < 3) {
      setInvalidForm(WRONG_FORMAT_PASSWORD);
      return;
    }
    dispatch(registration(name, email, phone, password));
    closeModal()
    notify(email)

    //navigate.push('/')
  };

  const notify = (email) =>{
    toast.success(`Activez votre compte de messagerie ${email} `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal}>
        {isLoading ? <Icon name='preloader' className={styles.preloader} /> :
        
        <>
        <div className={styles.form}>
          <h2 className={styles.title}>Inscription</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Nom
            </label>
            {/* <input className={styles.input} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя" required /> */}
            <Input
              className={styles.input}
              value={name}
              onChange={handleLogin}
              type="text"
              id="name"
              placeholder="Entrer le mot de passe"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            {/* <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" required /> */}
            <Input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              placeholder="Entrer votre Email"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">
              Téléphone
            </label>
            {/* <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" required /> */}
            <Input
              className={styles.input}
              type="phone"
              id="phone"
              value={phone}
              onChange={handlePhone}
              placeholder="Entrez le numéro de téléphone"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Mot de passe
            </label>
            {/* <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            /> */}
            <Input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder="Введите пароль"
            />
          </div>
          {/*<button className={styles.submitButton} type="submit">Зарегистрироваться</button>*/}
          {invalidValueForm && (
            <span className={styles.invalidText}>{invalidValueForm}</span>
          )}
          <Button
            className={styles.submitButton}
            size="medium"
            type="submit"
            onClick={() => sendData(name, email, password)}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.toggleArea}>
          <h3>Уже есть аккаунт на ?</h3>
          <button
            className={styles.toggleButton}
            onClick={() => toggleActiveTab("login")}
          >
            Войти
          </button>
        </div>
        </>}
      </Modal>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </>
  );
};
