import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

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

type MainListItemsProps = {
  sideMenuOpen: boolean;
};
const MainListItems: React.FC<MainListItemsProps> = ({ sideMenuOpen }) => {
  const classes = useStyles();
  return (
    <div>
      <NavLink to="/mypage/regist" activeClassName={classes.activeNav} exact>
        <ListItem button className="pl-8">
          <ListItemIcon>
            <AddCircleIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="作成" />
        </ListItem>
      </NavLink>
      <Divider />
      <NavLink to="/mypage" activeClassName={classes.activeNav} exact>
        <ListItem button className="pl-8">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="ホーム" />
        </ListItem>
      </NavLink>
      <ListItem className="pl-8">
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="家計簿" />
        <ExpandMoreIcon />
      </ListItem>
      <List component="div" disablePadding>
        <ListItem button className={sideMenuOpen ? "pl-12 transition" : "pl-8"}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="一覧" />
        </ListItem>
        <ListItem button className={sideMenuOpen ? "pl-12 transition" : "pl-8"}>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="グラフ" />
        </ListItem>
        <ListItem button className={sideMenuOpen ? "pl-12 transition" : "pl-8"}>
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary="予算" />
        </ListItem>
      </List>
    </div>
  );
};

const SecondaryListItems = () => {
  return (
    <div>
      <ListItem button className="pl-8">
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="お役立ちニュース" />
      </ListItem>
      <ListItem button className="pl-8">
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="家内掲示板" />
      </ListItem>
      <ListItem button className="pl-8">
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="やる事リスト" />
      </ListItem>
    </div>
  );
};

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
export { MainListItems, SecondaryListItems };
