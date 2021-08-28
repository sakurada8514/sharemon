import React from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import List from "./contents/AccountBook/List";
import Home from "./contents/Home";
import RegistMoney from "./contents/RegistMoney/RegistMoney";

export default function MypageRouters(props) {
    const location = useLocation();
    const [_, rootPath] = location.pathname.split("/");
    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={rootPath}>
                <Route exact path="/mypage/home" children={<Home />} />
                <Route exact path="/mypage/list" children={<List />} />
                <Route
                    exact
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
