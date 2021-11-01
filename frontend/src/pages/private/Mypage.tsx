import React, { useState, useEffect, useGlobal } from "reactn";
import useSWR from "swr";
import { useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import { AlertProps } from "@material-ui/lab";
import { Drawer } from "@mui/material";
import clsx from "clsx";
import MediaQuery from "react-responsive";

import SideMenu from "components/SideMenu/SideMenu";
import BottomAppBar from "components/SideMenu/BottomAppBar";
import Header from "components/Header/Header";
import AlertMessage from "components/Atoms/AlertMessage";
import TransitionMotion from "components/Route/Motion";
import MypageRouters from "./MypageRouters";
import { OK } from "utils/constant";

import { createInviteUrl as createInviteUrlApi } from "../../api/Room/invite";
import { getRoomName as getRoomNameApi } from "../../api/Room/room";
import { logout as logoutApi } from "../../api/Auth/login";

export default function Mypage() {
  const history = useHistory();
  const [user, setUser] = useGlobal("user");

  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [mobileSideMenuOpen, setMobileSideMenuOpen] = useState(false);
  const [settingMenuOpen, setSettingMenuOpen] = useState(null);
  const [inviteMenuOpen, setInviteMenuOpen] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] =
    useState<AlertProps["severity"]>("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { data: roomName, error: roomNameError } = useSWR(
    ["/room/", user.room_id],
    getRoomNameApi,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (roomNameError) {
    history.push("/error");
  }

  useEffect(() => {
    if (window.matchMedia("(max-width: 960px)").matches) {
      setSideMenuOpen(false);
    }
  }, []);

  const handleSideMenuOpen = () => setSideMenuOpen(true);
  const handleSideMenuClose = () => setSideMenuOpen(false);
  const handleMobileSideMenuOpen = () => setMobileSideMenuOpen(true);
  const handleMobileSideMenuClose = () => setMobileSideMenuOpen(false);

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
              handleSideMenuClose={handleSideMenuClose}
            />
          </MediaQuery>
          <main className="flex-grow min-h-screen bg-gray-50 transition pt-14 pb-24">
            <AlertMessage
              alertOpen={alertOpen}
              severity={alertSeverity}
              alertMessage={alertMessage}
              handleAlert={handleAlertClose}
            />
            <Box
              className={clsx(
                "transition",
                sideMenuOpen ? "md:pl-60" : "md:pl-24"
              )}
            >
              <MypageRouters
                handleAlertOpen={handleAlertOpen}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}
                roomName={roomName}
              />
            </Box>
          </main>
          <MediaQuery query="(max-width: 767px)">
            <BottomAppBar handleMobileSideMenuOpen={handleMobileSideMenuOpen} />
            <Drawer
              open={mobileSideMenuOpen}
              onClick={handleMobileSideMenuClose}
            >
              <SideMenu
                sideMenuOpen={true}
                handleSideMenuClose={handleSideMenuClose}
              />
            </Drawer>
          </MediaQuery>
        </BrowserRouter>
      </Box>
    </TransitionMotion>
  );
}
