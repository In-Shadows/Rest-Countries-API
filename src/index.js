import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { RegionContextProvider } from "./store/region-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RegionContextProvider>
    <App />
  </RegionContextProvider>
);
