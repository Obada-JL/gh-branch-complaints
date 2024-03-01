import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Modal from "react-modal";
import { CookiesProvider } from "react-cookie";
import MainPage from "./components/MainPage.jsx";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>
);
