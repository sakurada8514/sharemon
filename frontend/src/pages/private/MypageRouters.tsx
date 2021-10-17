import React from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AlertProps } from "@material-ui/lab";

import List from "./contents/AccountBook/List/ListTemplate";
import ExpenseDetail from "./contents/AccountBook/Detail/ExpenseDetail";
import IncomeDetail from "./contents/AccountBook/Detail/IncomeDetail";
import EditExpense from "./contents/AccountBook/Edit/EditExpense";
import EditIncome from "./contents/AccountBook/Edit/EditIncome";
import BudgetList from "./contents/Budget/BudgetList";
import RegistBudget from "./contents/Budget/RegistBudget";
import Home from "./contents/Home";
import RegistMoney from "./contents/AccountBook/Regist/RegistTemplate";
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
        <Route
          exact
          path="/mypage/expense/:id"
          children={
            <ExpenseDetail
              handleAlertOpen={handleAlertOpen}
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route
          exact
          path="/mypage/income/:id"
          children={
            <IncomeDetail
              handleAlertOpen={handleAlertOpen}
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route path="/error" children={<Error />} />
        <Route
          exact
          path="/mypage/regist"
          children={
            <RegistMoney
              handleAlertOpen={handleAlertOpen}
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route
          exact
          path="/mypage/expense/edit/:id"
          children={
            <EditExpense
              handleAlertOpen={handleAlertOpen}
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route
          exact
          path="/mypage/income/edit/:id"
          children={
            <EditIncome
              handleAlertOpen={handleAlertOpen}
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route exact path="/mypage/budget" children={<BudgetList />} />
        <Route
          exact
          path="/mypage/budget/regist"
          children={
            <RegistBudget
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
