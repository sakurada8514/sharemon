import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Top from "./pages/Top";
import Error from "./pages/Error";
import Login from "./pages/Auth/Login";
import Regist from "./pages/Auth/Regist";
import ResetPassword from "./pages/Auth/ResetPassword";
import ReregistPassword from "./pages/Auth/ReregistPassword";
import Mypage from "./pages/private/Mypage";
import GuestRoute from "./components/Route/GuestRoute";
import PrivateRoute from "./components/Route/PrivateRoute";
import RoomRegistRoute from "./components/Route/RegistRoomRoute";
import RegistRoom from "./pages/private/RegistRoom";
import InviteRegist from "./pages/Auth/InviteRegist";

export default function Routers() {
  const location = useLocation();
  const [_, rootPath] = location.pathname.split("/");
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={rootPath}>
        <Route exact path="/" children={<Top />} />
        <Route path="/error" children={<Error />} />
        <GuestRoute exact path="/login" children={<Login />} />
        <GuestRoute
          exact
          path="/password/reset/mail"
          children={<ResetPassword />}
        />
        <GuestRoute
          exact
          path="/password/reset"
          children={<ReregistPassword />}
        />
        <GuestRoute exact path="/regist" children={<Regist />} />
        <GuestRoute exact path="/invite/regist" children={<InviteRegist />} />
        <PrivateRoute path="/mypage" children={<Mypage />} />
        <RoomRegistRoute exact path="/regist/room" children={<RegistRoom />} />
      </Switch>
    </AnimatePresence>
  );
}
