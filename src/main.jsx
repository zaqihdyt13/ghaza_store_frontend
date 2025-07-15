// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { registerSW } from "virtual:pwa-register";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const updateSW = registerSW({
//   onNeedRefresh() {
//     if (confirm("Versi baru tersedia. Refresh?")) {
//       updateSW(true);
//     }
//   },
//   onOfflineReady() {
//     console.log("App is ready to work offline");
//   },
// });

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Daftar service worker dan dapatkan fungsi update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Versi baru tersedia. Refresh?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline");
  },
});
