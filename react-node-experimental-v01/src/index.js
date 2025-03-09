import React, { StrictMode } from "react";
import {createRoot} from "react-dom/client";
// import "./styles.css"; // Optional: If you plan to use CSS

import App from "./App";

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App {... window.__REACT_PROPS__||{}} />
  </StrictMode>
);
