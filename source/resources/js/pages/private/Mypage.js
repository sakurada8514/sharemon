import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import clsx from "clsx";

import SideMenu from "../../components/SideMenu/SideMenu";
import Header from "../../components/Header/Header";
import MyAlert from "../../components/Parts/MyAlert";
import Top from "../Top";
import RegistMoney from "./contents/RegistMoney/RegistMoney";

import { BACK_COLOR_GREEN } from "../../Const/styleConstant";
import { OK } from "../../Const/constant";
import { setUser } from "../../stores/auth";

import { createInviteUrl as createInviteUrlApi } from "../../api/Room/invite";
import { logout as logoutApi } from "../../api/Auth/login";

export default function Mypage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (window.matchMedia("(max-width: 960px)").matches) {
            setSideMenuOpen(false);
        }
    }, []);

    const [sideMenuOpen, setSideMenuOpen] = useState(true);
    const [accountBookMenuOpen, setAccountBookMenuOpen] = useState(true);
    const [settingMenuOpen, setSettingMenuOpen] = useState(null);
    const [inviteMenuOpen, setInviteMenuOpen] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handleSideMenuOpen = () => setSideMenuOpen(true);
    const handleSideMenuClose = () => setSideMenuOpen(false);

    const handleAccountBookMenu = () =>
        setAccountBookMenuOpen(!accountBookMenuOpen);

    const handleSettingMenuOpen = (event) =>
        setSettingMenuOpen(event.currentTarget);
    const handleSettingMenuClose = () => setSettingMenuOpen(null);

    const handleInviteMenuOpen = (event) =>
        setInviteMenuOpen(event.currentTarget);
    const handleInviteMenuClose = () => setInviteMenuOpen(null);

    const handleAlertClose = () => setAlertOpen(false);

    const handleAlertOpen = () => {
        setAlertOpen(true);
        window.setTimeout(function () {
            setAlertOpen(false);
        }, 3000);
    };

    async function InviteUrlCopy() {
        const response = await createInviteUrlApi();
        handleInviteMenuClose();

        if (response.status !== OK) {
            setAlertOpen(true);
            setAlertMessage(
                "招待URLのコピーに失敗しました。時間をおいて再度お試しください。"
            );
            setAlertSeverity("error");
            window.setTimeout(function () {
                setAlertOpen(false);
            }, 3000);
        } else {
            navigator.clipboard
                .writeText(response.data.url)
                .then(() => {
                    setAlertOpen(true);
                    setAlertMessage("招待URLをコピーしました。");
                    window.setTimeout(function () {
                        setAlertOpen(false);
                    }, 3000);
                })
                .catch((err) => {
                    setAlertMessage(
                        "招待URLのコピーに失敗しました。時間をおいて再度お試しください。"
                    );
                    setAlertOpen(true);
                    setAlertSeverity("error");
                    window.setTimeout(function () {
                        setAlertOpen(false);
                    }, 3000);
                });
        }
    }

    async function logout() {
        const response = await logoutApi();

        if (response === OK) {
            dispatch(setUser(null));
            history.push("/login");
        } else {
            history.push("/error");
        }
    }

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <Header
                    sideMenuOpen={sideMenuOpen}
                    settingMenuOpen={settingMenuOpen}
                    inviteMenuOpen={inviteMenuOpen}
                    handleSideMenuOpen={handleSideMenuOpen}
                    handleSettingMenuOpen={handleSettingMenuOpen}
                    handleSettingMenuClose={handleSettingMenuClose}
                    handleInviteMenuOpen={handleInviteMenuOpen}
                    handleInviteMenuClose={handleInviteMenuClose}
                    InviteUrlCopy={InviteUrlCopy}
                    logout={logout}
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

                    <MyAlert
                        alertOpen={alertOpen}
                        severity={alertSeverity}
                        alertMessage={alertMessage}
                        handleAlert={handleAlertClose}
                    />

                    <div
                        className={clsx(
                            classes.container,
                            sideMenuOpen
                                ? classes.openPadding
                                : classes.closePadding
                        )}
                    >
                        <Switch>
                            <Route
                                exact
                                path="/mypage/home"
                                children={<Top />}
                            />
                            <Route
                                exact
                                path="/mypage/regist"
                                children={
                                    <RegistMoney
                                        handleAlertOpen={handleAlertOpen}
                                        setAlertSeverity={setAlertSeverity}
                                        setAlertMessage={setAlertMessage}
                                    />
                                }
                            />
                        </Switch>
                    </div>
                </main>
            </BrowserRouter>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: BACK_COLOR_GREEN,
        transition: theme.transitions.create(["all"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    container: {
        padding: theme.spacing(3),
        transition: theme.transitions.create(["all"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    openPadding: {
        paddingLeft: "244px",
    },
    closePadding: {
        paddingLeft: "95px",
    },
}));
