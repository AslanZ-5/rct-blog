import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { AuthProvider } from "react-auth-kit";
import App from "./components/App";
import ErrorBoundry from "./components/ErrorBoundry";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Provider store={store}>
        <AuthProvider
          authType="cookie"
          authName="_auth"
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <App />
        </AuthProvider>
      </Provider>
    </ErrorBoundry>
  </React.StrictMode>
);
