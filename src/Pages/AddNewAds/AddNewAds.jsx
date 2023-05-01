import React, {useEffect, useState} from "react";
import styles from "./AddNewAds.module.css";
import cn from "classnames";
import { Dropdown } from "../../component/Dropdown/Dropdown";
import { Button } from "../../component/Button/Button";
import { Icon } from "../../component/Icons/Icon";
import { Layout } from "../../component/Layout/Layout";
import { Input } from "../../component/Input/Input";
import {carInputs} from "./categories/Car/Car";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoryFields} from "../../store/ad/adSlice";
import {getAllCategories, getAllFieldsCategory, isLoadingAd} from "../../store/ad/adSelector";
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'


export const AddNewAds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeAd, setTypeAd] = useState({});
  const [values, setValues] = useState({})
  const [photo, setPhoto] = useState([])

    const dispatch = useDispatch()
    const allCategoies = useSelector(getAllCategories)
    const fields = useSelector(getAllFieldsCategory)
    const isLoading = useSelector(isLoadingAd)
    console.log(isLoading)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

  useEffect(() => {
      dispatch(getCategoryFields(typeAd.categoryName))
  }, [typeAd])

  useEffect(() => {
      if(fields.length === 0) return
      const obj = fields.reduce((acc, item) => {
          acc[item.title] = '';
          return acc;
      }, {});
      setValues(obj)
  }, [fields])

  const handleChangeCurrentInputValue = (event) => {
    const currentTitle = event.target.name
    const newObj = {...values}
    newObj[currentTitle] = event.target.value
    setValues(newObj)
  }


  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeAd = (e) => {
    setTypeAd({
        transtale: e.target.textContent,
        categoryName: e.target.id
    })
    setIsOpen(false)
  }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values); // Выводим данные из формы в консоль
    };

    const handlePhotoChange = (event) => {
        const files = Array.from(event.target.files);
        setPhoto(files);
    };

  return (
    <Layout isSearchBlock={false}>
      <div className={styles.wrapper}>
        <div className={styles.chooseArea}>
            {isLoading ? <span>Loading...</span> : <Button className={styles.buttonType} onClick={handleButtonClick}>
            {!typeAd.transtale ? 'Выберите категорию' : typeAd.transtale}
          </Button>}
          {isOpen && (
            <Dropdown className={styles.dropdown}>
              <div className={styles.type}>
                  {
                      allCategoies.map((type) => {
                          return(
                              <>
                                  <span className={styles.typeItem} id={type.category} onClick={handleTypeAd}>{type.translate}</span>
                              </>
                          )
                      })
                  }
              </div>
            </Dropdown>
          )}
        </div>
          <div className={styles.addInformationArea}>
              <div className={styles.enterInformation}>
                  <form className={styles.form} onSubmit={handleSubmit}>
                          {fields.map((item, index) => (
                              <div className={styles.field}>
                                  <Input className={styles.input} name={item.title} placeholder={item.placeholder} onChange={(e) => handleChangeCurrentInputValue(e)} />
                              </div>
                          ))}
                      <button className={styles.submitButton} type="submit">Отправка</button>
                  </form>
              </div>
              <label htmlFor="photos">Добавьте фото</label>
              <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  required
              />
          </div>

      </div>
    </Layout>
  );
};
