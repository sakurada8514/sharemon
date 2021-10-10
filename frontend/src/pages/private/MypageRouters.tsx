import React from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AlertProps } from "@material-ui/lab";

import List from "./contents/AccountBook/List";
import ExpenseDetail from "./contents/AccountBook/ExpenseDetail";
import IncomeDetail from "./contents/AccountBook/IncomeDetail";
import Home from "./contents/Home";
import RegistMoney from "./contents/RegistMoney";
import Error from "pages/Error";

export type MypageRoutersProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  roomName: string;
};

const MypageRouters: React.FC<MypageRoutersProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
  roomName,
}) => {
  const location = useLocation();
  const [esc, rootPath] = location.pathname.split("/");

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={rootPath}>
        <Route exact path="/mypage" children={<Home roomName={roomName} />} />
        <Route path="/mypage/list" children={<List />} />
        <Route path="/mypage/expense/:id" children={<ExpenseDetail />} />
        <Route path="/mypage/income/:id" children={<IncomeDetail />} />
        <Route path="/error" children={<Error />} />
        <Route
          path="/mypage/regist"
          children={
            <RegistMoney
              handleAlertOpen={handleAlertOpen}
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
            />
          }
        />
      </Switch>
    </AnimatePresence>
  );
};
export default MypageRouters;
