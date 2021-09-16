import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "rgba(52, 211, 153, 1)",
      main: "rgba(16, 185, 129, 1)",
      dark: "rgba(5, 150, 105, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(96, 165, 250, 1)",
      main: "rgba(59, 130, 246, 1)",
      dark: "rgba(37, 99, 235, 1)",
      contrastText: "#fff",
    },
  },
});
