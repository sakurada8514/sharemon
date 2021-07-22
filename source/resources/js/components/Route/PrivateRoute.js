import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";
import RoomRegist from "../../pages/private/RoomRegist";

function PrivateRoute(props) {
    const isAuth = useSelector(isAuthSelector);
    const roomId = useSelector((state) => state.auth.user.room_id);
    console.log(roomId);
    if (isAuth && roomId !== null) {
        return <Route {...props} />;
    } else if (isAuth && roomId === null) {
        return <Redirect to="/regist/room" />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default PrivateRoute;
