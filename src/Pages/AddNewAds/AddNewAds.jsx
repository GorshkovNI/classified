import React, {useEffect, useState} from "react";
import styles from "./AddNewAds.module.css";
import cn from "classnames";
import { Dropdown } from "../../component/Dropdown/Dropdown";
import { Button } from "../../component/Button/Button";
import { Icon } from "../../component/Icons/Icon";
import { Layout } from "../../component/Layout/Layout";
import { Input } from "../../component/Input/Input";
import {carInputs} from "./categories/car";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../store/ad/adSlice";
import {getAllCategories} from "../../store/ad/adSelector";

const typeAds = [
    {
        title: 'Авто',
        label: 'car',
    },
    {
        title: 'Недвижимость',
        label: 'rent'
    }
]

export const AddNewAds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeAd, setTypeAd] = useState("");
  const [values, setValues] = useState({})

    const dispatch = useDispatch()
    const allCategoies = useSelector(getAllCategories)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

  useEffect(() => {
      // const newObj = carInputs.reduce((acc, current) => {
      //     return {
      //         ...acc,
      //         [current.title]: ''
      //     }
      // }, {})
      // setValues(newObj)
      // console.log(newObj)
  }, [typeAd])

  const handleInputChange = (index, event) => {
      const newValues = [...values];
      newValues[index] = event.target.value;
      setValues(index)
  }

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

  const handleTypeAd = (e) => { // Нужно будет для отправки на серер типо объявления и получения соотвествующих полей
      allCategoies.forEach((item) => {
          if(item.translate == e.target.textContent){
              //dispatch(getCategories(item.label))
              //return
          }
      })
    setTypeAd(e.target.textContent)
    setIsOpen(false)
  }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values); // Выводим данные из формы в консоль
    };

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
                  {
                      allCategoies.map((type) => {
                          return(
                              <>
                                  <span className={styles.typeItem} onClick={handleTypeAd}>{type.translate}</span>
                              </>
                          )
                      })
                  }
              </div>
            </Dropdown>
          )}
        </div>
        <div className={styles.enterInformation}>
            <form onSubmit={handleSubmit}>
                {
                    carInputs.map((item, index) => {
                        return (
                            <>
                                <Input className={styles.input} name={item.title} placeholder={item.placeholder} onChange={handleChange} />
                            </>
                        )
                    })
                }
                <button type='submit'>Отправка</button>
            </form>
        </div>
      </div>
    </Layout>
  );
};
