import React from "react";
import { Modal } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default function MyModal(props) {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.show}
            onClose={props.handleModalClose}
            closeAfterTransition
        >
            <Fade in={props.show}>{props.body}</Fade>
        </Modal>
    );
}

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
