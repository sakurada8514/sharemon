import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

import SettingButton from "../Parts/Menu/SettingMenuButton";
import InviteMenuButton from "../Parts/Menu/InviteMenuButton";

export default function Header(props) {
    const classes = useStyles();
    return (
        <AppBar
            color={"primary"}
            position="absolute"
            className={clsx(
                classes.appBar,
                props.sideMenuOpen && classes.appBarShift
            )}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleSideMenuOpen}
                    className={clsx(
                        classes.menuButton,
                        props.sideMenuOpen && classes.menuButtonHidden
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    Sharemon
                </Typography>
                <InviteMenuButton
                    inviteMenuOpen={props.inviteMenuOpen}
                    handleInviteMenuOpen={props.handleInviteMenuOpen}
                    handleInviteMenuClose={props.handleInviteMenuClose}
                    InviteUrlCopy={props.InviteUrlCopy}
                />
                <SettingButton
                    settingMenuOpen={props.settingMenuOpen}
                    handleSettingMenuOpen={props.handleSettingMenuOpen}
                    handleSettingMenuClose={props.handleSettingMenuClose}
                    logout={props.logout}
                />
            </Toolbar>
        </AppBar>
    );
}

const drawerWidth = 220;

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
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));
