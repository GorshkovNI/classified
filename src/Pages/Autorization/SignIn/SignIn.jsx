import React, { useState } from "react";
import { Modal } from "../../../component/Modal/Modal";
import styles from "./SignIn.module.css";
import { Button } from "../../../component/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  login,
  removeInvalidLogging,
  setAuth,
} from "../../../store/auth/userSlice";
import { Input } from "../../../component/Input/Input";
import {
  errorActivate,
  getInvalidLogging,
  getIsLoading,
} from "../../../store/auth/userSelector";
import { Icon } from "../../../component/Icons/Icon";
import { useEffect } from "react";

export const SignIn = ({ openModal, closeModal, toggleActiveTab }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const isLoggedIn = useSelector(getInvalidLogging);
  const isActivate = useSelector(errorActivate)

  const handleLogin = (event) => {
    setEmail(event.target.value);
    dispatch(removeInvalidLogging())
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    dispatch(removeInvalidLogging());
  };

  const handleSubmit = async () => {
    dispatch(login(email, password));
    //closeModal();
  };

  useEffect(()=>{
    if(!isLoggedIn && !isLoading && !isActivate){
      closeModal()
    }

}, [isLoading])

  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal}>
        {isLoading ? (
          <Icon name="preloader" className={styles.preloader} />
        ) : (
          <>
            <div className={styles.form}>
              <h2 className={styles.title}>Entrée</h2>
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
                  placeholder="Entrer votre Email"
                  incorrect={isLoggedIn}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">
                  Mot de passe
                </label>
                {/* <input className={styles.input} value={password} onChange={handlePassword} type="password" id="password" placeholder='Введите пароль' /> */}
                <Input
                  className={styles.input}
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  id="password"
                  placeholder="Entrer le mot de passe"
                  incorrect={isLoggedIn}
                />
              </div>
              {/*<button className={styles.submitButton} type="submit">Зарегистрироваться</button>*/}
              {isLoggedIn && (
                <span className={styles.invalidText}>
                  Identifiant ou mot de passe incorrect!
                </span>
              )}
              {isActivate && (
                <span className={styles.invalidText}>
                  Besoin d'activer le compte
                </span>
              )}
              <Button
                className={styles.submitButton}
                size="medium"
                type="submit"
                onClick={handleSubmit}
              >
                Entrer
              </Button>
            </div>
            <div className={styles.toggleArea}>
              <h3>Vous n'avez pas encore de compte?</h3>
              <button
                className={styles.toggleButton}
                onClick={() => toggleActiveTab("registration")}
              >
                Enregistrer
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
