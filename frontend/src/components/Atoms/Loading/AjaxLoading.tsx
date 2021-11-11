import React from "react";
import { CircularProgress, Box } from "@material-ui/core";

export default function AjaxLoading() {
  return (
    <div className="bg-opacity-30 bg-black w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
      <CircularProgress color="secondary" />
    </div>
  );
}
