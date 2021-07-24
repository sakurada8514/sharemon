/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Modal(props) {
    if (props.modalShow) {
        return (
            <div css={styles.overlay}>
                <div css={styles.content}>
                    <div>{props.content}</div>
                    <div>{props.button}</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Modal;

const styles = {
    overlay: css({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.2s",
    }),
    content: css({
        zIndex: "2",
        backgroundColor: "#fff",
        width: "80%",
        maxWidth: "400px",
        padding: "30px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }),
    text: css({
        marginBottom: "15px",
    }),
};
