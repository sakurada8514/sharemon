import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" className="p-28">
      <CircularProgress />
    </Box>
  );
}
