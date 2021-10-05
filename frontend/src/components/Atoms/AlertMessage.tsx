import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertProps } from "@material-ui/lab";

import { IconButton, IconButtonProps, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type AlertMessageProps = {
  alertOpen: boolean;
  alertMessage: string;
  severity: AlertProps["severity"];
  handleAlert: IconButtonProps["onClick"];
};

const AlertMessage: React.FC<AlertMessageProps> = ({
  alertOpen,
  alertMessage,
  severity,
  handleAlert,
}) => {
  const classes = useStyles();

  return (
    <div className="w-full lg:fixed lg:right-3 lg:top-20">
      <Collapse in={alertOpen}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </div>
  );
};

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

export default AlertMessage;
