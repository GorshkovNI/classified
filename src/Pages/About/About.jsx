import { Layout } from "../../component/Layout/Layout";
import styles from "./About.module.css";
import logo from './Approved.svg';
import logo2 from './Copywriter.svg';
import logo3 from './pokupk.svg';
import logo4 from './people.svg';
import { FeedbackForm } from "../../component/FeedbackForm/Feedback.Form";

export const About = () => {
    return (
        <Layout isSearchBlock={false}>

            <div /* style={{maxWidth: '100%'}} */ className="container marketing">
                <div className={styles.container}>

                    <h2 className={styles.title} style={{ display: 'flex' }}>
                        <span style={{ margin: '10px' }} className={`${styles.title_word} ${styles.title_word_1} class1 class2`}>G<p style={{ fontSize: '1vw' }}>Generate</p></span>
                        <span style={{ margin: '10px' }} className={`${styles.title_word} ${styles.title_word_2} class1 class2`}>E<p style={{ fontSize: '1vw' }}>Engage</p></span>
                        <span style={{ margin: '10px' }} className={`${styles.title_word} ${styles.title_word_3} class1 class2`}>T<p style={{ fontSize: '1vw' }}>Target</p></span>
                        <span style={{ margin: '10px' }} className={`${styles.title_word} ${styles.title_word_4} class1 class2`}>I<p style={{ fontSize: '1vw' }}>Identify </p></span>
                        <span style={{ margin: '10px' }} className={`${styles.title_word} ${styles.title_word_1} class1 class2`}>T<p style={{ fontSize: '1vw' }}>Track </p></span>
                    </h2>



                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }} className="px-3">
                        <p style={{ fontSize: '1.25vw' }}>Nous sommes une jeune équipe de développeurs enthousiastes qui ont décidé de créer un service gratuit pour les résidents des pays africains. <b>Notre objectif : créer une plate-forme pratique pour l'interaction des vendeurs et des acheteurs.</b> Notre équipe est jeune et ne fait que monter en puissance.</p>
                        <h1>En bref sur notre service:</h1>
                    </div>
                    <div>
                        <img className="bd-placeholder-img rounded-circle" style={{ width: '100%' }} src={logo4} alt="People" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 text-center">
                        <img className="bd-placeholder-img rounded-circle" style={{ width: '100%' }} src={logo2} alt="Copywriter" />

                        <h2>Publier des annonces</h2>
                        <p>Utilisez une interface conviviale pour publier et contrôler vos annonces</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <img className="bd-placeholder-img rounded-circle" style={{ width: '100%' }} src={logo3} alt="pok" />

                        <h2>Acheter des marchandises</h2>
                        <p>Trouvez les bons produits et services par catégorie</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <img className="bd-placeholder-img rounded-circle" style={{ width: '100%' }} src={logo} alt="Approve" />
                        <h2>Pratique pour les affaires</h2>
                        <p>Service pratique pour les entreprises</p>
                    </div>
                </div>

            </div>
            <div style={{ width: '100%', backgroundColor: ' #1E90FF' }}>
                <h1 style={{ color: 'white', fontSize: '5vw', display: 'flex', justifyContent: 'center' }}><i className="bi bi-envelope-fill"></i>Feedback</h1>
            </div>
            <FeedbackForm/>
        </Layout >
    )
}