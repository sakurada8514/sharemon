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
import RoomRegist from "./pages/private/RoomRegist";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" children={<Top />} />
                    <Route exact path="/error" children={<Error />} />
                    <GuestRoute exact path="/login" children={<Login />} />
                    <GuestRoute exact path="/regist" children={<Regist />} />
                    <PrivateRoute path="/mypage" children={<Mypage />} />
                    <PrivateRoute
                        path="/regist/room"
                        children={<RoomRegist />}
                    />
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
