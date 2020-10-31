import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  // <React.StrictMode>
  <>
    <App />
    <ToastContainer />
  </>,
  // </React.StrictMode >
  document.getElementById("root")
);
