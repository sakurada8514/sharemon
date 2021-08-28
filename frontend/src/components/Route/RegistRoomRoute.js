import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";

export default function RegistRoomRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  const roomId = useSelector((state) =>
    isAuth ? state.auth.user.room_id : null
  );
  if (isAuth) {
    if (roomId === null) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/mypage" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
}
