import React from "react";
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
  return (
    <div className="w-full bottom-14 fixed md:right-3 md:top-20 md:w-1/2 lg:w-1/4 md:bottom-auto z-50">
      <Collapse in={alertOpen}>
        <Alert
          className=""
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

export default AlertMessage;
