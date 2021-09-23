import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import MediaQuery from "react-responsive";

import SettingButton from "./Menu/SettingMenuButton";
import InviteMenuButton from "./Menu/InviteMenuButton";
import { setRoomName } from "../../stores/room";

type HeaderProps = {
  sideMenuOpen: boolean;
  settingMenuOpen: null;
  inviteMenuOpen: null;
  roomName: string;
  handleSideMenuOpen: () => void;
  handleSettingMenuOpen: (e: any) => void;
  handleSettingMenuClose: () => void;
  handleInviteMenuOpen: (e: any) => void;
  handleInviteMenuClose: () => void;
  InviteUrlCopy: () => Promise<void>;
  logout: () => Promise<void>;
};

const Header: React.FC<HeaderProps> = ({
  sideMenuOpen,
  settingMenuOpen,
  inviteMenuOpen,
  roomName,
  handleSideMenuOpen,
  handleSettingMenuOpen,
  handleSettingMenuClose,
  handleInviteMenuOpen,
  handleInviteMenuClose,
  InviteUrlCopy,
  logout,
}) => {
  const classes = useStyles();
  return (
    <AppBar
      color={"primary"}
      className={clsx(classes.appBar, sideMenuOpen && classes.appBarShift)}
    >
      <Toolbar>
        <MediaQuery query="(min-width: 768px)">
          {!sideMenuOpen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleSideMenuOpen}
              className="mr-9"
            >
              <MenuIcon />
            </IconButton>
          )}
        </MediaQuery>
        <Box display="flex" className="flex-grow">
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className="mr-20 text-2xl md:text-3xl"
          >
            Sharemon
          </Typography>
          <MediaQuery query="(min-width: 768px)">
            <div className="flex items-end">
              <p className="text-xl font-light">{roomName}</p>
            </div>
          </MediaQuery>
        </Box>
        <InviteMenuButton
          inviteMenuOpen={inviteMenuOpen}
          handleInviteMenuOpen={handleInviteMenuOpen}
          handleInviteMenuClose={handleInviteMenuClose}
          InviteUrlCopy={InviteUrlCopy}
        />
        <SettingButton
          settingMenuOpen={settingMenuOpen}
          handleSettingMenuOpen={handleSettingMenuOpen}
          handleSettingMenuClose={handleSettingMenuClose}
          logout={logout}
        />
      </Toolbar>
    </AppBar>
  );
};

const drawerWidth = 228;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: "fixed",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default Header;
