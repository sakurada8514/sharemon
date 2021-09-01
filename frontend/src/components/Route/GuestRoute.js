import React, { useGlobal } from "reactn";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";

export default function GuestRoute(props) {
  // const isAuth = useSelector(isAuthSelector);
  const user = useGlobal("user")[0];

  return user ? <Redirect to="/mypage" /> : <Route {...props} />;
}
