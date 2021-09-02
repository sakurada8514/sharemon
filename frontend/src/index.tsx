import React, { useGlobal, useEffect, useState } from "reactn";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import store from "./stores/index";
import { setCurrentUser } from "./stores/auth";
import Routers from "./Routers";
import { currentUser as currentUserApi } from "./api/Auth/login";
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
  const [firstAuthLoading, setFirstAuthLoading] = useState(true);
  const setUser = useGlobal("user")[1];

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await currentUserApi();
        setUser(user);
        setFirstAuthLoading(false);
      } catch (err) {
        setUser(null);
        setFirstAuthLoading(false);
      }
    }
    getCurrentUser();
  }, [setUser]);

  if (firstAuthLoading) {
    return <span>Authenticating...</span>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  );
}

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
reportWebVitals();
// if (document.getElementById("invite_app")) {
//   ReactDOM.render(<InviteRegistApp />, document.getElementById("invite_app"));
// }
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
