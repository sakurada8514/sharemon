import React, { useState, useEffect, useGlobal } from "reactn";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import { AlertProps } from "@material-ui/lab";

import SideMenu from "../../components/SideMenu/SideMenu";
import BottomAppBar from "../../components/SideMenu/BottomAppBar";
import Header from "../../components/Header/Header";
import AlertMessage from "../../components/Atoms/AlertMessage";
import TransitionMotion from "../../components/Route/Motion";
import MypageRouters from "./MypageRouters";
import MediaQuery from "react-responsive";

import { BACK_COLOR_GREEN } from "../../utils/constant";
import { OK } from "../../utils/constant";

import { createInviteUrl as createInviteUrlApi } from "../../api/Room/invite";
import { getRoomDetail as getRoomDetailApi } from "../../api/Room/room";
import { logout as logoutApi } from "../../api/Auth/login";

export default function Mypage() {
  const classes = styles();

  const history = useHistory();
  const [user, setUser] = useGlobal("user");
  const setError = useGlobal("error")[1];

  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [accountBookMenuOpen, setAccountBookMenuOpen] = useState(true);
  const [settingMenuOpen, setSettingMenuOpen] = useState(null);
  const [inviteMenuOpen, setInviteMenuOpen] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] =
    useState<AlertProps["severity"]>("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (window.matchMedia("(max-width: 960px)").matches) {
      setSideMenuOpen(false);
    }

    getRoomName();
  }, []);

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

  async function getRoomName() {
    const response = await getRoomDetailApi(user.room_id);

    if (response.status === OK) {
      setRoomName(response.data.detail.room_name);
      console.log(response.data.detail.room_name);
    } else {
      setError(true);
    }
  }

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
      <Box className="flex">
        <BrowserRouter>
          <Header
            sideMenuOpen={sideMenuOpen}
            settingMenuOpen={settingMenuOpen}
            inviteMenuOpen={inviteMenuOpen}
            roomName={roomName}
            handleSideMenuOpen={handleSideMenuOpen}
            handleSettingMenuOpen={handleSettingMenuOpen}
            handleSettingMenuClose={handleSettingMenuClose}
            handleInviteMenuOpen={handleInviteMenuOpen}
            handleInviteMenuClose={handleInviteMenuClose}
            InviteUrlCopy={InviteUrlCopy}
            logout={logout}
          />
          <MediaQuery query="(min-width: 768px)">
            <SideMenu
              sideMenuOpen={sideMenuOpen}
              accountBookMenuOpen={accountBookMenuOpen}
              handleSideMenuOpen={handleSideMenuOpen}
              handleSideMenuClose={handleSideMenuClose}
              handleAccountBookMenu={handleAccountBookMenu}
            />
          </MediaQuery>
          <main className="flex-grow min-h-screen bg-gray-50 transition">
            <Box className="h-14" />

            <AlertMessage
              alertOpen={alertOpen}
              severity={alertSeverity}
              alertMessage={alertMessage}
              handleAlert={handleAlertClose}
            />

            <Box
              // className={clsx(
              //   classes.container,
              //   sideMenuOpen ? classes.openPadding : classes.closePadding
              // )}
              className="p-3 transition"
            >
              <MypageRouters
                handleAlertOpen={handleAlertOpen}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}
              />
            </Box>
          </main>
          <MediaQuery query="(max-width: 768px)">
            <BottomAppBar />
          </MediaQuery>
        </BrowserRouter>
      </Box>
    </TransitionMotion>
  );
}

const styles = makeStyles((theme) => ({
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
