import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "boxicons";
import "font-awesome/css/font-awesome.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { persistor, store } from "./components/store";

const domain = window.location.origin;

 //bofeng
if (domain.includes('https://test.baofengradios.co.in')) { //boffeng
  document.documentElement.style.setProperty('--bgColor', '#0069b3'); //blue
  document.documentElement.style.setProperty('--textColor', '#0069b3');
  document.documentElement.style.setProperty('--borderColor', '#0069b3');
} else if (domain.includes('https://www.adamclick.com')) { //adamclick
  document.documentElement.style.setProperty('--bgColor', '#b0247a'); //pink
  document.documentElement.style.setProperty('--textColor', '#b0247a');
  document.documentElement.style.setProperty('--borderColor', '#b0247a');
} else {
  document.documentElement.style.setProperty('--bgColor', '#0069b3'); //blue
  document.documentElement.style.setProperty('--textColor', '#0069b3');
  document.documentElement.style.setProperty('--borderColor', '#0069b3');
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <Router> */}
        <App />
        {/* </Router> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
