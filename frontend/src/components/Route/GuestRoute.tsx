import React, { useGlobal } from "reactn";
import { Route, Redirect, RouteProps } from "react-router-dom";

type GuestRouteProps = {};

const GuestRoute: React.FC<RouteProps> = (props) => {
  // const isAuth = useSelector(isAuthSelector);
  const user = useGlobal("user")[0];

  return user ? <Redirect to="/mypage" /> : <Route {...props} />;
};
export default GuestRoute;
