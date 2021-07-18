/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

import { setUser } from "../../stores/auth";
import { regist as registApi } from "../../api/Auth/regist";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";

const Regist = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleChangePasswordConfirmation = (e) =>
        setPasswordConfirmation(e.target.value);

    const history = useHistory();
    const dispatch = useDispatch();

    async function regist(e) {
        e.preventDefault();
        const response = await registApi(
            name,
            email,
            password,
            password_confirmation
        );

        if (response.status === OK) {
            dispatch(setUser(response.data.user));
            history.push("/mypage");
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
        <div css={styles.allWrapper}>
            <form onSubmit={regist} css={styles.form}>
                <input
                    css={styles.input}
                    type="text"
                    required
                    value={name}
                    onChange={handleChangeName}
                    placeholder="ユーザー名"
                />
                {typeof errors.name !== "undefined" && <p>{errors.name}</p>}
                <input
                    css={styles.input}
                    type="email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="メールアドレス"
                />
                {typeof errors.email !== "undefined" && <p>{errors.email}</p>}
                <input
                    css={styles.input}
                    type="password"
                    required
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="パスワード"
                />
                <input
                    css={styles.input}
                    type="password"
                    required
                    value={password_confirmation}
                    onChange={handleChangePasswordConfirmation}
                    placeholder="パスワード確認"
                />
                {typeof errors.password !== "undefined" && (
                    <p>{errors.password}</p>
                )}
                {typeof errors.auth !== "undefined" && <p>{errors.auth}</p>}
                <button css={styles.button} type="submit">
                    新規登録
                </button>
                <p css={styles.link} onClick={pushLogin}>
                    ログイン
                </p>
            </form>
        </div>
    );
};
const styles = {
    allWrapper: css({
        height: "100vh",
        backgroundColor: "#76b852",
        paddingTop: "100px",
    }),
    form: css({
        width: "90%",
        maxWidth: "360px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: "45px",
        textAlign: "center",
        boxShadow:
            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
    }),
    input: css({
        fontFamily: '"Roboto", sans-serif',
        backgroundColor: "#f2f2f2",
        width: "100%",
        padding: "15px",
        fontsize: "14px",
        marginBottom: "15px",
        textAlign: "left",
    }),
    button: css({
        fontFamily: '"Roboto", sans-serif',
        backgroundColor: "#4caf50",
        width: "100%",
        padding: "15px",
        fontsize: "14px",
        color: "#fff",
        transform: "all .3s ease",
        "&:hover": {
            backgroundColor: "#43a047",
        },
    }),
    link: css({
        color: "#4caf50",
        fontsize: "12px",
        cursor: "pointer",
        width: "50%",
        margin: "15px auto 0",
    }),
};

export default Regist;
