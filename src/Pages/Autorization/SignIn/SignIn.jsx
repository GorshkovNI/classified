import React, { useState } from "react";
import { Modal } from "../../../component/Modal/Modal";
import styles from "./SignIn.module.css";
import { Button } from "../../../component/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, removeInvalidLogging, setAuth } from "../../../store/user";
import { Input } from "../../../component/Input/Input";
import { getInvalidLogging } from "../../../store/userSelector";


export const SignIn = ({ openModal, closeModal, toggleActiveTab }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getInvalidLogging);

  const handleLogin = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    dispatch(removeInvalidLogging());
  };

  const handleSubmit = async () => {
    dispatch(login(email, password));
    closeModal()
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal}>
        <div className={styles.form}>
          <h2 className={styles.title}>Вход</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="login">
              Email
            </label>
            {/* <input className={styles.input} value={email} onChange={handleLogin} type="email" id="email" placeholder='Введите почту' /> */}
            <Input
              className={styles.input}
              value={email}
              onChange={handleLogin}
              type="email"
              id="email"
              placeholder="Введите почту"
              incorrect = {isLoggedIn}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Пароль
            </label>
            {/* <input className={styles.input} value={password} onChange={handlePassword} type="password" id="password" placeholder='Введите пароль' /> */}
            <Input
              className={styles.input}
              value={password}
              onChange={handlePassword}
              type="password"
              id="password"
              placeholder="Введите пароль"
              incorrect = {isLoggedIn}
            />
          </div>
          {/*<button className={styles.submitButton} type="submit">Зарегистрироваться</button>*/}
          {isLoggedIn && <span className={styles.invalidText}>Неверный логин или пароль!</span>}
          <Button
            className={styles.submitButton}
            size="medium"
            type="submit"
            onClick={handleSubmit}
          >
            Войти
          </Button>
        </div>
        <div className={styles.toggleArea}>
          <h3>Еще нет аккаунта на ?</h3>
          <button
            className={styles.toggleButton}
            onClick={() => toggleActiveTab("registration")}
          >
            Зарегистрироваться
          </button>
        </div>
      </Modal>
    </>
  );
};
