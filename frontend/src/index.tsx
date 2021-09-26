import React from "reactn";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";

import Routers from "./Routers";
import { theme } from "./theme";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Loading from "./components/Atoms/Loading";
import ModalTemplate from "./components/Modal/ModalTemplate";
import ErrorModal from "./components/Modal/ErrorModal";
import useAuth from "utils/hooks/useAuth";
import "./styles/tailwind.css";

function App() {
  const [error, firstAuthLoading] = useAuth();

  function reload() {
    window.location.reload();
  }

  return firstAuthLoading ? (
    <Loading />
  ) : (
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
