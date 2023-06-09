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
import {getAllCategories, getAllFieldsCategory, getLoadingAd} from "../../store/ad/adSelector";
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'
import {Rent} from "./categories/Rent/Rent";
import {getIsAuth} from "../../store/auth/userSelector";
import axios from "axios";
import {Work} from "./categories/Work/Work";
import {Other} from "./categories/Other/Other";

const categoryAd = {
    car: <Car />,
    rent: <Rent />,
    work: <Work />,
    other: <Other />
};


export const AddNewAds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeAd, setTypeAd] = useState({});
  const [values, setValues] = useState({})

    const dispatch = useDispatch()
    const allCategoies = useSelector(getAllCategories)
    console.log(allCategoies)
    //const fields = useSelector(getAllFieldsCategory)
    const isLoading = useSelector(getLoadingAd)
    const isAuth = useSelector(getIsAuth)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

  useEffect(() => {
      dispatch(getCategoryFields(typeAd.categoryName))
      console.log(typeAd)
  }, [typeAd])


  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeAd = (e) => {
    setTypeAd({
        translate: e.target.textContent,
        categoryName: e.target.id
    })
    setIsOpen(false)
  }


  return (
    <Layout isSearchBlock={false}>
      <div className={styles.wrapper}>
          { isAuth ?
              <div className={styles.chooseArea}>
                  {isLoading ? <span>Loading...</span> :
                  <Button className={styles.buttonType} onClick={handleButtonClick}>
                      {!typeAd.translate ? 'Choisir une catégorie' : typeAd.translate}
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
              </div>  : <div>Besoin de se connecter d'abord</div>
          }
          {typeAd.categoryName && categoryAd[typeAd.categoryName]}
      </div>
    </Layout>
  );
};
