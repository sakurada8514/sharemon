import { Button } from "@material-ui/core";
import React, { VFC } from "react";
import { BACK_COLOR_WHITE } from "utils/constant";
import { makeStyles } from "@material-ui/styles";
import ModalTemplate from "components/Modal/ModalTemplate";

type Props = {
  children: React.ReactNode;
  modalShow;
  handleModalClose;
};
const Presenter: VFC<Props> = (props) => {
  return (
    <>
      {props.children}
      <ModalTemplate
        show={props.modalShow}
        handleModalClose={props.handleModalClose}
        body={modalBody(props.handleModalClose)}
      />
    </>
  );
};

export default Presenter;

function modalBody(handleModalClose: () => void) {
  const classes = modalStyles();

  return (
    <div className={classes.root}>
      <h1>ルーム招待が届いています。</h1>
      <p>新規登録してルームに参加しましょう！</p>
      <Button variant="contained" color="secondary" onClick={handleModalClose}>
        閉じる
      </Button>
    </div>
  );
}

const modalStyles = makeStyles(() => ({
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
      marginBottom: "16px",
    },
  },
}));
