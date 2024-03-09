import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./utils/MainRoutes";
import { persistor, store } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import "./custom.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRoutes />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
