import React from "react";
import ReactDOM from "react-dom/client";
import "./config/firebaseConfig";
import App from "./App";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
