import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";

import "../index.css";
import AppContrast from "../AppContrast.jsx";
import { Site } from "../config/siteType.js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// Sanity check : TODO: Remove
console.log(`You are at site: ${Site.type} in main-contrast.jsx`);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContrast />
  </React.StrictMode>
);
