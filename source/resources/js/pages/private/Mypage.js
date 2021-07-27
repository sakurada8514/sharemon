import React from "react";
import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeProvider } from "@material-ui/core";

import SideMenu from "../../components/SideMenu/SideMenu";
import Header from "../../components/Header/Header";
import { theme } from "../../styleConstant";
import { BACK_COLOR_GREEN } from "../../styleConstant";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        backgroundColor: BACK_COLOR_GREEN,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function Mypage() {
    const classes = useStyles();

    const [sideMenuOpen, setSideMenuOpen] = useState(true);
    const [accountBookMenuOpen, setAccountBookMenuOpen] = useState(true);

    function handleSideMenuOpen() {
        setSideMenuOpen(true);
    }
    function handleSideMenuClose() {
        setSideMenuOpen(false);
    }
    function handleAccountBookMenu() {
        setAccountBookMenuOpen(!accountBookMenuOpen);
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Header
                    sideMenuOpen={sideMenuOpen}
                    handleSideMenuOpen={handleSideMenuOpen}
                />
                <SideMenu
                    sideMenuOpen={sideMenuOpen}
                    accountBookMenuOpen={accountBookMenuOpen}
                    handleSideMenuOpen={handleSideMenuOpen}
                    handleSideMenuClose={handleSideMenuClose}
                    handleAccountBookMenu={handleAccountBookMenu}
                />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {/* <Container
                    maxWidth="lg"
                    className={classes.container}
                ></Container> */}
                </main>
            </div>
        </ThemeProvider>
    );
}

// import { useHistory } from "react-router";
// import { useDispatch } from "react-redux";

// import { logout as logoutApi } from "../../api/Auth/login";
// import { OK } from "../../constant";
// import { setUser } from "../../stores/auth";

// const Mypage = () => {
//     const history = useHistory();
//     const dispatch = useDispatch();

//     async function logout(e) {
//         e.preventDefault();
//         const response = await logoutApi();

//         if (response === OK) {
//             dispatch(setUser(null));
//             history.push("/");
//         } else {
//             history.push("/error");
//         }
//     }

//     return (
//         <div>
//             <p>mypage</p>
//             <button onClick={logout}>logout</button>
//         </div>
//     );
// };

// export default Mypage;
