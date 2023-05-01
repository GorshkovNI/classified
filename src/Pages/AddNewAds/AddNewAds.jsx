import React, {useEffect, useState} from "react";
import styles from "./AddNewAds.module.css";
import cn from "classnames";
import { Dropdown } from "../../component/Dropdown/Dropdown";
import { Button } from "../../component/Button/Button";
import { Icon } from "../../component/Icons/Icon";
import { Layout } from "../../component/Layout/Layout";
import { Input } from "../../component/Input/Input";
import {Car} from "./categories/Car/Car";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategoryFields} from "../../store/ad/adSlice";
import {getAllCategories, getAllFieldsCategory, isLoadingAd} from "../../store/ad/adSelector";
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'
import {Rent} from "./categories/Rent/Rent";

const categoryAd = {
    car: <Car />,
    rent: <Rent />,
};


export const AddNewAds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeAd, setTypeAd] = useState({});
  const [values, setValues] = useState({})

    const dispatch = useDispatch()
    const allCategoies = useSelector(getAllCategories)
    //const fields = useSelector(getAllFieldsCategory)
    const isLoading = useSelector(isLoadingAd)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

  useEffect(() => {
      dispatch(getCategoryFields(typeAd.categoryName))
      console.log(typeAd)
  }, [typeAd])

  // useEffect(() => {
  //     if(fields.length === 0) return
  //     const obj = fields.reduce((acc, item) => {
  //         acc[item.title] = '';
  //         return acc;
  //     }, {});
  //     setValues(obj)
  // }, [fields])

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
          {typeAd.categoryName && categoryAd[typeAd.categoryName]}
      </div>
    </Layout>
  );
};
