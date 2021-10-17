import React, { useState } from "react";
import { useHistory } from "react-router";
import { Fab, Modal, Fade } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import ModalTemplate from "components/Modal/ModalTemplate";
import BudgetForm from "components/Form/BudgetForm";

import { fetcherApi } from "api/fetcher";
const BudgetList = () => {
  const history = useHistory();
  const handleRegistClick = () => {
    history.push("/mypage/budget/regist");
  };
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className=" w-12 h-12 fixed bottom-20 right-6 z-10"
        onClick={handleRegistClick}
      >
        <EditIcon />
      </Fab>
    </>
  );
};
export default BudgetList;
