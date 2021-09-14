import React, { useState, useEffect, useGlobal } from "reactn";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import { AlertProps } from "@material-ui/lab";

import SideMenu from "../../components/SideMenu/SideMenu";
import Header from "../../components/Header/Header";
import AlertMessage from "../../components/Atoms/AlertMessage";
import TransitionMotion from "../../components/Route/Motion";
import MypageRouters from "./MypageRouters";

import { BACK_COLOR_GREEN } from "../../utils/constant";
import { OK } from "../../utils/constant";

import { createInviteUrl as createInviteUrlApi } from "../../api/Room/invite";
import { logout as logoutApi } from "../../api/Auth/login";

export default function Mypage() {
  const classes = styles();

  const history = useHistory();
  const setUser = useGlobal("user")[1];
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
  const [alertSeverity, setAlertSeverity] =
    useState<AlertProps["severity"]>("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSideMenuOpen = () => setSideMenuOpen(true);
  const handleSideMenuClose = () => setSideMenuOpen(false);

  const handleAccountBookMenu = () =>
    setAccountBookMenuOpen(!accountBookMenuOpen);

  const handleSettingMenuOpen = (e: any) => setSettingMenuOpen(e.currentTarget);
  const handleSettingMenuClose = () => setSettingMenuOpen(null);

  const handleInviteMenuOpen = (e: any) => setInviteMenuOpen(e.currentTarget);
  const handleInviteMenuClose = () => setInviteMenuOpen(null);

  const handleAlertClose = () => setAlertOpen(false);

  const handleAlertOpen = (closedTime = 3000) => {
    setAlertOpen(true);
    window.setTimeout(function () {
      setAlertOpen(false);
    }, closedTime);
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
      setUser(null);
      history.push("/login");
    } else {
      history.push("/error");
    }
  }

  return (
    <TransitionMotion>
      <Box className={classes.root}>
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
            <Box className={classes.appBarSpacer} />

            <AlertMessage
              alertOpen={alertOpen}
              severity={alertSeverity}
              alertMessage={alertMessage}
              handleAlert={handleAlertClose}
            />

            <Box
              className={clsx(
                classes.container,
                sideMenuOpen ? classes.openPadding : classes.closePadding
              )}
            >
              <MypageRouters
                handleAlertOpen={handleAlertOpen}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}
              />
            </Box>
          </main>
        </BrowserRouter>
      </Box>
    </TransitionMotion>
  );
}

const styles = makeStyles((theme) => ({
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