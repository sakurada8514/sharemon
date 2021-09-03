import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default function Loading() {
  const classes = styles();
  return (
    <Box display="flex" justifyContent="center" className={classes.loading}>
      <CircularProgress />
    </Box>
  );
}

const styles = makeStyles((theme) => ({
  loading: {
    paddingTop: "100px",
  },
}));
