import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../stores/auth";
import RoomRegist from "../../pages/private/RoomRegist";

export default function RoomRegistRoute(props) {
    const isAuth = useSelector(isAuthSelector);

    if (isAuth) {
        const roomId = useSelector((state) => state.auth.user.room_id);
        if (roomId === null) {
            return <Route {...props} />;
        } else {
            return <Redirect to="/mypage" />;
        }
    } else {
        return <Redirect to="/login" />;
    }
}
