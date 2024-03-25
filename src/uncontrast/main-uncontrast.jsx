import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Sanity check : TODO: Remove
console.log( `You are at site: ${Site.type}, in main-uncontrast.jsx`);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
