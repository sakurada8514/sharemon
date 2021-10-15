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
    <div className="w-full bottom-14 fixed lg:right-3 lg:top-20 z-10">
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
