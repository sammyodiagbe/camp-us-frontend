import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";
import "./styles/base.css";
import { verifyUserAuthentication } from "./redux/actions/auth-actions";

// verify that the user is authenticated
store.dispatch(verifyUserAuthentication());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
