import React from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import List from "./contents/AccountBook/List";
import Home from "./contents/Home";
import RegistMoney from "./contents/RegistMoney";

import type { MypageRoutersProps } from "../../types/pages/private/Mypage";

export default function MypageRouters(props: MypageRoutersProps) {
  const location = useLocation();
  const [esc, rootPath] = location.pathname.split("/");

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={rootPath}>
        <Route exact path="/mypage" children={<Home />} />
        <Route path="/mypage/list" children={<List />} />
        <Route
          path="/mypage/regist"
          children={
            <RegistMoney
              handleAlertOpen={props.handleAlertOpen}
              setAlertSeverity={props.setAlertSeverity}
              setAlertMessage={props.setAlertMessage}
            />
          }
        />
      </Switch>
    </AnimatePresence>
  );
}
