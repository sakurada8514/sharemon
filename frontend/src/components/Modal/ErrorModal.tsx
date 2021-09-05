import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, ButtonProps } from "@material-ui/core";

import { BACK_COLOR_WHITE } from "../../utils/constant";
//モーダル

type ErrorModalProps = {
  handleButtonClick: () => void;
};
const ErrorModal: React.FC<ErrorModalProps> = ({ handleButtonClick }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <h1>システムエラーが発生しました。</h1>
      <p>時間を置いてから再度お試しください。</p>
      <Button variant="contained" color="secondary" onClick={handleButtonClick}>
        閉じる
      </Button>
    </div>
  );
};

const styles = makeStyles(() => ({
  root: {
    width: "90%",
    maxWidth: "400px",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACK_COLOR_WHITE,
    "&:focus-visible": {
      outline: "none",
    },
    borderRadius: "10px",
    "& > h1": {
      marginBottom: "8px",
    },
    "& > p": {
      marginBottom: "24px",
    },
  },
}));

export default ErrorModal;
