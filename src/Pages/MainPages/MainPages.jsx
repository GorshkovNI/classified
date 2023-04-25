import React, { useEffect } from "react";
import styles from "./MainPages.module.css";
import cn from "classnames";
import { Input } from "../../component/Input/Input";
import { Icon } from "../../component/Icons/Icon";
import { CardProduct } from "../../component/CardProduct/CardProduct";
import { Categories } from "../../component/Categories/Categories";
import { Layout } from "../../component/Layout/Layout";

export const MainPages = ({ className }) => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <Categories />
        <div className={styles.title}>
          <h3 className={styles.textRecomendation}>Рекомендации для вас</h3>
        </div>
        <div className={styles.productArea}>
          <div className={styles.products}>
            <CardProduct />
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {<CardProduct />}
            {/* {<CardProduct />} */}
            {/* {<CardProduct />} */}
            {/*<CardProduct />*/}
            {/*<CardProduct />*/}
            {/*<CardProduct />*/}
            {/*<CardProduct />*/}
            {/*<CardProduct />*/}
          </div>
          <div className={styles.infoArea}>
            <span>Ваши последнии покупки</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
