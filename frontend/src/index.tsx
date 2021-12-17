import React from "reactn";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "@material-ui/core";

import theme from "theme";
import Loading from "components/Base/Loading/Loading";
import useAuth from "utils/hooks/useAuth";
import Routers from "./Routers";

import "styles/tailwind.css";

function App() {
  const firstAuthLoading = useAuth();

  return firstAuthLoading ? (
    <Loading />
  ) : (
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
