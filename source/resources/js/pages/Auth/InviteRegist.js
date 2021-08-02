import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import { setUser } from "../../stores/auth";
import { inviteRegist as inviteRegistApi } from "../../api/Auth/regist";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";
import { BACK_COLOR_WHITE } from "../../styleConstant";
import RegistForm from "../../components/Form/RegistForm";
import MyModal from "../../components/Parts/MyModal";

let inviteeData = null;
if (typeof laravelInviteeData !== "undefined") {
    inviteeData = laravelInviteeData;
}

export default function InviteRegist() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [modalShow, setModalShow] = useState(true);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleChangePasswordConfirmation(e) {
        setPasswordConfirmation(e.target.value);
    }

    function handleModalClose() {
        setModalShow(false);
    }

    const history = useHistory();
    const dispatch = useDispatch();

    async function regist(e) {
        e.preventDefault();

        const roomId = inviteeData.room_id;

        const response = await inviteRegistApi(
            name,
            email,
            password,
            password_confirmation,
            roomId
        );

        if (response.status === OK) {
            window.location.href = "/mypage";
        } else if (
            response.status === UNAUTHORIZED ||
            response.status === VALIDATION
        ) {
            setErrors(response.data.errors);
        } else {
            history.push("/error");
        }
    }

    function pushLogin() {
        history.push("/login");
    }

    return (
        <>
            <RegistForm
                regist={regist}
                name={name}
                email={email}
                password={password}
                password_confirmation={password_confirmation}
                errors={errors}
                isInvite={true}
                handleChangeName={handleChangeName}
                handleChangeEmail={handleChangeEmail}
                handleChangePassword={handleChangePassword}
                handleChangePasswordConfirmation={
                    handleChangePasswordConfirmation
                }
                pushLogin={pushLogin}
            />
            <MyModal
                show={modalShow}
                handleModalClose={handleModalClose}
                body={modalBody(handleModalClose)}
            />
        </>
    );
}

function modalBody(handleModalClose) {
    const classes = useModalStyles();
    return (
        <div className={classes.root}>
            <h1>{inviteeData.name}さんからルーム招待が届いています。</h1>
            <p>新規登録してルームに参加しましょう！</p>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleModalClose}
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
            marginBottom: "8px",
        },
        "& > p": {
            marginBottom: "16px",
        },
    },
}));
