require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Top from "./pages/Top";
import Login from "./pages/Auth/Login";
import Auth from "./pages/Auth/Auth";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/">
                <Top></Top>
            </Route>
            <Route exact path="/login">
                <Login></Login>
            </Route>
            {/* <Auth>
                <Switch>
                    <Route exact path="/list1" component={List1} />
                    <Route exact path="/list2" component={List2} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </Auth> */}
        </BrowserRouter>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
