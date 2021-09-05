import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatIcon from "@material-ui/icons/Chat";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PieChartIcon from "@material-ui/icons/PieChart";
import MoneyIcon from "@material-ui/icons/Money";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { SUB_COLOR_BLUE } from "../../utils/constant";

export function MainListItems(props) {
  const classes = useStyles();
  return (
    <div>
      <NavLink to="/mypage/regist" activeClassName={classes.activeNav} exact>
        <ListItem button>
          <ListItemIcon>
            <AddCircleIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="作成" />
        </ListItem>
      </NavLink>
      <Divider />
      <NavLink to="/mypage" activeClassName={classes.activeNav} exact>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="ホーム" />
        </ListItem>
      </NavLink>
      <ListItem button onClick={props.handleAccountBookMenu}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="家計簿" />
        {props.accountBookMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={props.accountBookMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={props.sideMenuOpen ? classes.nestMenu : ""}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="一覧" />
          </ListItem>
          <ListItem
            button
            className={props.sideMenuOpen ? classes.nestMenu : ""}
          >
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="グラフ" />
          </ListItem>
          <ListItem
            button
            className={props.sideMenuOpen ? classes.nestMenu : ""}
          >
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="予算" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export function SecondaryListItems(props) {
  const classes = useStyles();
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="お役立ちニュース" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="家内掲示板" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="やる事リスト" />
      </ListItem>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  nestMenu: {
    paddingLeft: theme.spacing(4),
    transition: theme.transitions.create(["all"], {
      easing: theme.transitions.easing.sharp,
    }),
  },
  icon: {
    color: SUB_COLOR_BLUE,
    width: "1.5em",
    height: "1.5em",
  },
  activeNav: {
    "& > .MuiListItem-button": {
      borderRight: "4px solid #4B75B9",
    },
  },
}));
