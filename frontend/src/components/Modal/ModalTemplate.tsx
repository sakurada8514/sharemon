import React from "react";
import { Modal } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

type ModalTemplateProps = {
  show: boolean;
  handleModalClose: () => void;
  body: JSX.Element;
};

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  show,
  handleModalClose,
  body,
}) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={handleModalClose}
      closeAfterTransition
    >
      <Fade in={show}>{body}</Fade>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus-visible": {
      outline: "none",
    },
  },
}));

export default ModalTemplate;
