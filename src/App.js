import './App.css';
import { Header } from './component/Header/Header';
import {CardProduct} from "./component/CardProduct/CardProduct";
import {Input} from "./component/Input/Input";
import {MainPages} from "./Pages/MainPages/MainPages";
import {SearchBlock} from "./component/SearchBlock/SearchBlock";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBlock />
      <div className='bd'>
          <CardProduct />
          <CardProduct />
          <CardProduct />
      </div>
    </div>
  );
}

export default App;
