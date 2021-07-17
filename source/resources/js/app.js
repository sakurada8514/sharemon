require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/index";
import { setCurrentUser } from "./stores/auth";

import Top from "./pages/Top";
import Error from "./pages/Error";
import Login from "./pages/Auth/Login";
import Regist from "./pages/Auth/Regist";
import Mypage from "./pages/private/Mypage";
import GuestRoute from "./components/GuestRoute";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" children={<Top />} />
                    <Route exact path="/error" children={<Error />} />
                    <GuestRoute path="/login" children={<Login />} />
                    <GuestRoute path="/regist" children={<Regist />} />
                    <PrivateRoute path="/mypage" children={<Mypage />} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

store.dispatch(setCurrentUser()).then(() => {
    if (document.getElementById("app")) {
        ReactDOM.render(<App />, document.getElementById("app"));
    }
});
