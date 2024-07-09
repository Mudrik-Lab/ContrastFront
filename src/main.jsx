import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppContrast from "./contrast/AppContrast.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContrast />
  </React.StrictMode>
);
