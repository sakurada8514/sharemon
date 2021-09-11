import React, { useGlobal } from "reactn";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = (props) => {
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
};
export default PrivateRoute;
