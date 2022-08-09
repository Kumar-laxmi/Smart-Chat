import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOxnlDHNzqNNI30tsfvl39obBjh-pXb_s",
  authDomain: "firechat-67d98.firebaseapp.com",
  projectId: "firechat-67d98",
  storageBucket: "firechat-67d98.appspot.com",
  messagingSenderId: "861888832568",
  appId: "1:861888832568:web:f4a5ecfa8d2c3597bcf2cd",
  measurementId: "G-HE933L53RB"
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
