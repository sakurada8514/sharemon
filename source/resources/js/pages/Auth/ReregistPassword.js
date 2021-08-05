import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import MyModal from "../../components/Parts/MyModal";
import ReregistPasswordForm from "../../components/Form/ReregistPasswordForm";
import { OK, UNAUTHORIZED, VALIDATION } from "../../Const/constant";
import { BACK_COLOR_WHITE } from "../../Const/styleConstant";

import { reregistPassword as reregistPasswordApi } from "../../api/Auth/login";

export default function ReregistPassword() {
    const history = useHistory();

    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleChangePasswordConfirmation = (e) =>
        setPasswordConfirmation(e.target.value);
    const pushLogin = () => history.push("/login");

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    async function reregistPassword(e) {
        e.preventDefault();

        const response = await reregistPasswordApi(
            query.get("email"),
            password,
            password_confirmation
        );

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
            <ReregistPasswordForm
                reregistPassword={reregistPassword}
                password={password}
                password_confirmation={password_confirmation}
                errors={errors}
                handleChangePassword={handleChangePassword}
                handleChangePasswordConfirmation={
                    handleChangePasswordConfirmation
                }
                pushLogin={pushLogin}
            />
            <MyModal
                show={modalShow}
                handleModalClose={pushLogin}
                body={modalBody(pushLogin)}
            />
        </>
    );
}
//モーダル
function modalBody(handleModalToggle) {
    const classes = useModalStyles();

    return (
        <div className={classes.root}>
            <h1>パスワードのリセットが完了しました。</h1>
            <p>ログインフォームへ戻りログインして下さい。</p>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleModalToggle}
            >
                ログインフォームへ
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
            marginBottom: "8px",
        },
        "& > p": {
            marginBottom: "24px",
        },
    },
}));
