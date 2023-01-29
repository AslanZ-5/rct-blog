import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./components/App";
import ErrorBoundry from "./components/ErrorBoundry";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundry>
  </React.StrictMode>
);
