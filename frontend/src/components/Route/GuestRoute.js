import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";

export default function GuestRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  return isAuth ? <Redirect to="/mypage" /> : <Route {...props} />;
}
