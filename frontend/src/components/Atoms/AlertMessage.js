import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

export default function AlertMessage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={props.alertOpen}>
        <Alert
          severity={props.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={props.handleAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.alertMessage}
        </Alert>
      </Collapse>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    top: "70px",
    right: "10px",
  },
}));
