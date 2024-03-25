import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";

import "../index.css";
import App from '../App.jsx';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

console.log("main-contrast.jsx");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
