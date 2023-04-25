import React, { useState } from "react";
import styles from "./AddNewAds.module.css";
import cn from "classnames";
import { Dropdown } from "../../component/Dropdown/Dropdown";
import { Button } from "../../component/Button/Button";
import { Icon } from "../../component/Icons/Icon";
import { Layout } from "../../component/Layout/Layout";
import { Input } from "../../component/Input/Input";

export const AddNewAds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeAd, setTypeAd] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeAd = (e) => {
    setTypeAd(e.target.textContent)
    setIsOpen(false)
  }

  return (
    <Layout isSearchBlock={false}>
      <div className={styles.wrapper}>
        <div className={styles.chooseArea}>
          <Button className={styles.buttonType} onClick={handleButtonClick}>
            {!typeAd ? 'Выберите категорию' : typeAd}
          </Button>
          {isOpen && (
            <Dropdown className={styles.dropdown}>
              <div className={styles.type}>
                <span className={styles.typeItem} onClick={handleTypeAd}>Авто</span>
                <span className={styles.typeItem} onClick={handleTypeAd}>Недвижимость</span>
              </div>
            </Dropdown>
          )}
        </div>
        <div className={styles.enterInformation}>
            <Input className={styles.input} placeholder={'Введите название авто'} />
            <Input className={styles.input} placeholder={'Цвет'} />
            <Input className={styles.input} placeholder={'Привод'} />
        </div>
        
      </div>
    </Layout>
  );
};
