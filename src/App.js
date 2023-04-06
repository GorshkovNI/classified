import './App.css';
import { Header } from './component/Header/Header';
import {MainPages} from "./Pages/MainPages/MainPages";
import {SearchBlock} from "./component/SearchBlock/SearchBlock";
import {useState} from "react";

import {Autorization} from "./Pages/Autorization/Autorization";

function App() {

    const [isOpenSignUp, setIsOpenSignUp] = useState(false)
    const [activeTab, setActiveTab] = useState('login')

    const toggleActiveTab = (active) => {
        setActiveTab(active)
    }

    const toggleModal = () => {
        setIsOpenSignUp(!isOpenSignUp)
        document.body.classList.add("modal-open");
    }

    const closeModal = () =>{
        setIsOpenSignUp(false)
        document.body.classList.remove("modal-open");
    }

  return (
    <div className="App">
      <Header toggleModal={toggleModal} />
      <SearchBlock />
      <MainPages />
      <Autorization activeTab={activeTab} toggleActiveTab={toggleActiveTab} openModal={isOpenSignUp} closeModal={closeModal} />
    </div>
  );
}

export default App;
