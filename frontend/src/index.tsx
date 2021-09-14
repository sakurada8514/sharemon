import React, { useGlobal, useEffect, useState } from "reactn";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";

import Routers from "./Routers";
import { currentUser as currentUserApi } from "./api/Auth/login";
import { theme } from "./theme";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Loading from "./components/Atoms/Loading";
import ModalTemplate from "./components/Modal/ModalTemplate";
import ErrorModal from "./components/Modal/ErrorModal";
import "./tailwind.css";

function App() {
  const [firstAuthLoading, setFirstAuthLoading] = useState(true);
  const setUser = useGlobal("user")[1];
  const [error, setError] = useGlobal("error");

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await currentUserApi();
        console.log(user);

        setUser(user);
        setFirstAuthLoading(false);
      } catch (err) {
        setUser(null);
        setFirstAuthLoading(false);
      }
    }
    getCurrentUser();
    setError(false);
  }, [setUser]);

  function reload() {
    window.location.reload();
  }

  if (firstAuthLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
      <ModalTemplate
        show={error}
        handleModalClose={reload}
        body={<ErrorModal handleButtonClick={reload} />}
      />
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
