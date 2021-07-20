/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

import { setUser } from "../../stores/auth";
import { login as loginApi } from "../../api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleChangeRemember = (e) => setRemember(!remember);

    const history = useHistory();
    const dispatch = useDispatch();

    async function login(e) {
        e.preventDefault();
        const response = await loginApi(email, password, remember);

        if (response.status === OK) {
            dispatch(setUser(response.data.user));
            history.push("/regist/room");
        } else if (
            response.status === UNAUTHORIZED ||
            response.status === VALIDATION
        ) {
            setErrors(response.data.errors);
        } else {
            history.push("/error");
        }
    }

    function pushRegist() {
        history.push("/regist");
    }

    return (
        <div css={formStyles.allWrapper}>
            <form onSubmit={login} css={formStyles.form}>
                <input
                    css={formStyles.input}
                    type="email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="メールアドレス"
                />
                {typeof errors.email !== "undefined" && (
                    <p css={formStyles.error}>{errors.email}</p>
                )}
                <input
                    css={formStyles.input_last}
                    type="password"
                    required
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="パスワード"
                />
                {typeof errors.password !== "undefined" && (
                    <p css={formStyles.error}>{errors.password}</p>
                )}
                {typeof errors.auth !== "undefined" && (
                    <p css={formStyles.error}>{errors.auth}</p>
                )}
                <div css={formStyles.check_box_area}>
                    <input
                        name="remember"
                        type="checkbox"
                        onClick={handleChangeRemember}
                        value={remember}
                        checked={remember ? "checked" : ""}
                    />
                    <label
                        css={formStyles.check_box}
                        for="remember"
                        onClick={handleChangeRemember}
                    >
                        次回から自動ログイン
                    </label>
                </div>
                <button css={formStyles.button} type="submit">
                    ログイン
                </button>
                <p css={formStyles.link} onClick={pushRegist}>
                    新規登録
                </p>
            </form>
        </div>
    );
};
export const formStyles = {
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
        marginBottom: "15px",
        textAlign: "left",
    }),
    input_last: css({
        fontFamily: '"Roboto", sans-serif',
        backgroundColor: "#f2f2f2",
        width: "100%",
        padding: "15px",
        marginBottom: "5px",
        textAlign: "left",
    }),
    check_box: css({
        fontFamily: '"Roboto", sans-serif',
        fontSize: "12px",
    }),
    check_box_area: css({
        margin: "5px 0 15px",
        display: "flex",
        justifyContent: "flex-start",
    }),
    button: css({
        fontFamily: '"Roboto", sans-serif',
        backgroundColor: "#4caf50",
        width: "100%",
        padding: "15px",
        color: "#fff",
        transform: "all .3s ease",
        "&:hover": {
            backgroundColor: "#43a047",
        },
    }),
    link: css({
        color: "#4caf50",
        fontSize: "14px",
        cursor: "pointer",
        width: "50%",
        margin: "15px auto 0",
    }),
    error: css({
        color: "#dc143c",
        fontSize: "14px",
        marginBottom: "15px",
    }),
};

export default Login;
