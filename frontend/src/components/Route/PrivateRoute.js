import React, { useGlobal } from "reactn";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";
import RoomRegist from "../../pages/private/RegistRoom";

export default function PrivateRoute(props) {
  const user = useGlobal("user")[0];
  const roomId = user ? user.room_id : null;

  if (user) {
    if (roomId !== null) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/regist/room" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
}
