import './App.css';
import { Header } from './component/Header/Header';
import {CardProduct} from "./component/CardProduct/CardProduct";
import {Input} from "./component/Input/Input";

function App() {
  return (
    <div className="App">
      <Header />
      <div className='searchBlock'>
          <Input className='mainInput' />
      </div>
      <div className='bd'>
          <CardProduct />
          <CardProduct />
          <CardProduct />
      </div>

    </div>
  );
}

export default App;
