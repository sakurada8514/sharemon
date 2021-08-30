import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import store from "../src/stores/index";

import Top from "../src/pages/Top";
import Error from "../src/pages/Error";
import InviteRegist from "../src/pages/Auth/InviteRegist";
import { theme } from "../src/Const/styleConstant";

export default function InviteRegistApp() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" children={<Top />} />
            <Route exact path="/error" children={<Error />} />
            <Route exact path="/regist/invite" children={<InviteRegist />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}
