require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import store from "./stores/index";
import { setCurrentUser } from "./stores/auth";
import Routers from "./router";

import { theme } from "./Const/styleConstant";
import InviteRegistApp from "./InviteRegistApp";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routers />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

store.dispatch(setCurrentUser()).then(() => {
    if (document.getElementById("app")) {
        ReactDOM.render(<App />, document.getElementById("app"));
    }
    if (document.getElementById("invite_app")) {
        ReactDOM.render(
            <InviteRegistApp />,
            document.getElementById("invite_app")
        );
    }
});
