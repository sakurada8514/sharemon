import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "#fff",
        width: "1.25em",
        height: "1.25em",
    },
}));

const StyledMenu = withStyles({
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

export default function InviteMenuButton(props) {
    const classes = useStyles();
    return (
        <>
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={props.handleInviteMenuOpen}
            >
                <GroupAddIcon className={classes.icon} />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={props.inviteMenuOpen}
                keepMounted
                open={Boolean(props.inviteMenuOpen)}
                onClose={props.handleInviteMenuClose}
            >
                <MenuItem>LINEで招待</MenuItem>
                <MenuItem onClick={props.InviteUrlCopy}>招待URLコピー</MenuItem>
            </StyledMenu>
        </>
    );
}
