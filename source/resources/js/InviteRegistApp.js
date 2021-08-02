import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/index";
import { ThemeProvider } from "@material-ui/core";

import Top from "./pages/Top";
import Error from "./pages/Error";
import InviteRegist from "./pages/Auth/InviteRegist";
import { theme } from "./Const/styleConstant";

export default function InviteRegistApp() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" children={<Top />} />
                        <Route exact path="/error" children={<Error />} />
                        <Route
                            exact
                            path="/regist/invite"
                            children={<InviteRegist />}
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}
