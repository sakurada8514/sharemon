import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

export default function SettingMenuButton(props) {
  const classes = useStyles();
  return (
    <>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={props.handleSettingMenuOpen}
      >
        <SettingsIcon className={classes.icon} />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={props.settingMenuOpen}
        keepMounted
        open={Boolean(props.settingMenuOpen)}
        onClose={props.handleSettingMenuClose}
      >
        <NavLink to="/mypage/settings/profile" exact>
          <MenuItem onClick={props.handleSettingMenuClose}>
            プロフィール設定
          </MenuItem>
        </NavLink>
        <NavLink to="/mypage/settings/room" exact>
          <MenuItem onClick={props.handleSettingMenuClose}>ルーム設定</MenuItem>
        </NavLink>
        <MenuItem onClick={props.logout}>ログアウト</MenuItem>
      </StyledMenu>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#fff",
    width: "1.25em",
    height: "1.25em",
  },
}));

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
