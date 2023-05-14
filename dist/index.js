import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Provider, { store: store },
    React.createElement(App, { store: store })));
