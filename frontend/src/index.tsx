import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import store from "./stores/index";
import { setCurrentUser } from "./stores/auth";
import Routers from "./Routers";

import { theme } from "./theme";
// import InviteRegistApp from "./InviteRegistApp";
import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// require("./bootstrap");

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
// store.dispatch(setCurrentUser()).then(() => {
// if (document.getElementById("invite_app")) {
//   ReactDOM.render(<InviteRegistApp />, document.getElementById("invite_app"));
// }
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
