import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../stores/auth";

function PrivateRoute(props) {
    const isAuth = useSelector(isAuthSelector);
    return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
