import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import ResetPasswordForm from "../../components/Form/ResetPasswordForm";
import MyModal from "../../components/Parts/MyModal";
import { OK, UNAUTHORIZED, VALIDATION } from "../../Const/constant";
import { BACK_COLOR_WHITE } from "../../Const/styleConstant";

import { resetPassword as resetPasswordApi } from "../../api/Auth/login";

export default function ResetPassword() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleModalToggle = () => setModalShow(!modalShow);
    const pushLogin = () => history.push("/login");

    async function resetPassword(e) {
        e.preventDefault();
        const response = await resetPasswordApi(email);
        if (response.status === OK) {
            setModalShow(true);
        } else if (
            response.status === UNAUTHORIZED ||
            response.status === VALIDATION
        ) {
            setErrors(response.data.errors);
        } else {
            history.push("/error");
        }
    }

    return (
        <>
            <ResetPasswordForm
                resetPassword={resetPassword}
                email={email}
                errors={errors}
                handleChangeEmail={handleChangeEmail}
                pushRegist={pushLogin}
            />
            <MyModal
                show={modalShow}
                handleModalClose={handleModalToggle}
                body={modalBody(handleModalToggle)}
            />
        </>
    );
}
//モーダル
function modalBody(handleModalToggle) {
    const classes = useModalStyles();

    return (
        <div className={classes.root}>
            <h1>ご登録のメールアドレスにリセット用のURLを送信しました。</h1>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleModalToggle}
            >
                閉じる
            </Button>
        </div>
    );
}

const useModalStyles = makeStyles(() => ({
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
            marginBottom: "24px",
        },
    },
}));
