import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { MainListItems, SecondaryListItems } from "./ListItems";
import { BACK_COLOR_WHITE } from "../../utils/constant";

export default function SideMenu(props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.sideMenuOpen && classes.drawerPaperClose
        ),
      }}
      open={props.sideMenuOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={props.handleSideMenuClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MainListItems
          sideMenuOpen={props.sideMenuOpen}
          handleAccountBookMenu={props.handleAccountBookMenu}
          accountBookMenuOpen={props.accountBookMenuOpen}
        />
      </List>
      <Divider />
      <List>
        <SecondaryListItems
          sideMenuOpen={props.sideMenuOpen}
          handleAccountBookMenu={props.handleAccountBookMenu}
          accountBookMenuOpen={props.accountBookMenuOpen}
        />
      </List>
    </Drawer>
  );
}

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    backgroundColor: BACK_COLOR_WHITE,
    position: "fixed",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
