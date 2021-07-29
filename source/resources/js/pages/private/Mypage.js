import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SideMenu from "../../components/SideMenu/SideMenu";
import Header from "../../components/Header/Header";
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
    const [settingMenuOpen, setSettingMenuOpen] = useState(null);
    const [inviteMenuOpen, setInviteMenuOpen] = useState(null);

    function handleSideMenuOpen() {
        setSideMenuOpen(true);
    }
    function handleSideMenuClose() {
        setSideMenuOpen(false);
    }
    function handleAccountBookMenu() {
        setAccountBookMenuOpen(!accountBookMenuOpen);
    }

    function handleSettingMenuOpen(event) {
        setSettingMenuOpen(event.currentTarget);
    }

    function handleSettingMenuClose() {
        setSettingMenuOpen(null);
    }

    function handleInviteMenuOpen(event) {
        setInviteMenuOpen(event.currentTarget);
    }

    function handleInviteMenuClose() {
        setInviteMenuOpen(null);
    }
    return (
        <div className={classes.root}>
            <Header
                sideMenuOpen={sideMenuOpen}
                settingMenuOpen={settingMenuOpen}
                inviteMenuOpen={inviteMenuOpen}
                handleSideMenuOpen={handleSideMenuOpen}
                handleSettingMenuOpen={handleSettingMenuOpen}
                handleSettingMenuClose={handleSettingMenuClose}
                handleInviteMenuOpen={handleInviteMenuOpen}
                handleInviteMenuClose={handleInviteMenuClose}
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
