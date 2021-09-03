import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { SUB_COLOR_GREEN } from "../../../utils/constant";

export default function PrimaryLoadingButton(
  handleButtonClick: () => void,
  children: string,
  loading: boolean
) {
  const classes = styles();

  <div className={classes.wrapper}>
    <Button
      variant="contained"
      color="primary"
      disabled={loading}
      onClick={handleButtonClick}
    >
      {children}
    </Button>
    {loading && (
      <CircularProgress size={24} className={classes.buttonProgress} />
    )}
  </div>;
}

const styles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  // buttonSuccess: {
  //   backgroundColor: SUB_COLOR_GREEN,
  //   '&:hover': {
  //     backgroundColor: green[700],
  //   },
  // },
  buttonProgress: {
    color: SUB_COLOR_GREEN,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
