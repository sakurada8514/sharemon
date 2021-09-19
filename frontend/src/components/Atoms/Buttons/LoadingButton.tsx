import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, ButtonProps } from "@material-ui/core";
import clsx from "clsx";
import { SUB_COLOR_GREEN } from "../../../utils/constant";

type props = {
  handleButtonClick: (e?: any) => any;
  text: string;
  loading: boolean;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  fullWidth?: ButtonProps["fullWidth"];
};

const LoadingButton: React.FC<props> = ({
  handleButtonClick,
  text,
  loading,
  color = "primary",
  variant = "contained",
  fullWidth = false,
}) => {
  const classes = styles();

  return (
    <div className="relative">
      <Button
        variant={variant}
        color={color}
        disabled={loading}
        onClick={handleButtonClick}
        className="px-14 py-1"
        fullWidth={fullWidth}
      >
        {text}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          className="text-green-500 absolute top-1/2 left-1/2 -mt-3 -ml-3"
        />
      )}
    </div>
  );
};

const styles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  button: {
    padding: "2px 56px",
    fontSize: "1.25em",
  },
  buttonProgress: {
    color: SUB_COLOR_GREEN,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default LoadingButton;
