import React, { useGlobal } from "reactn";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";

export default function RegistRoomRoute(props) {
  const user = useGlobal("user")[0];

  const roomId = user ? user.room_id : null;
  if (user) {
    if (roomId === null) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/mypage" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
}
