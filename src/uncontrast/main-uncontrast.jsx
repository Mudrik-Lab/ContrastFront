import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { Site } from "../config/siteType.js";
import AppUncontrast from "./AppUncontrast.jsx";

Sentry.init({
  dsn: "https://03b7886eefa39b4c3a67c3a400a31f88@o4505002748936192.ingest.us.sentry.io/4507553430044672",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    "https://uncontrustdb.tau.ac.il/api/",
    "https://contrastdb.tau.ac.il/api/",
    /^https:\/\/yourserver\.io\/api/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Sanity check : TODO: Remove
console.log(`You are at site: ${Site.type}, in main-uncontrast.jsx`);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppUncontrast />
  </React.StrictMode>
);
