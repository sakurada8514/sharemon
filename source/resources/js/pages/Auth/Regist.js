/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

import { setUser } from "../../stores/auth";
import { regist as registApi } from "../../api/Auth/regist";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";
import { formStyles } from "./Login";

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

    function pushLogin() {
        history.push("/login");
    }

    return (
        <div css={formStyles.allWrapper}>
            <form onSubmit={regist} css={formStyles.form}>
                <input
                    css={formStyles.input}
                    type="text"
                    required
                    value={name}
                    onChange={handleChangeName}
                    placeholder="ユーザー名"
                />
                {typeof errors.name !== "undefined" && (
                    <p css={formStyles.error}>{errors.name}</p>
                )}
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
                    css={formStyles.input}
                    type="password"
                    required
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="パスワード"
                />
                <input
                    css={formStyles.input}
                    type="password"
                    required
                    value={password_confirmation}
                    onChange={handleChangePasswordConfirmation}
                    placeholder="パスワード確認"
                />
                {typeof errors.password !== "undefined" && (
                    <p css={formStyles.error}>{errors.password}</p>
                )}
                {typeof errors.auth !== "undefined" && (
                    <p css={formStyles.error}>{errors.auth}</p>
                )}
                <button css={formStyles.button} type="submit">
                    新規登録
                </button>
                <p css={formStyles.link} onClick={pushLogin}>
                    ログイン
                </p>
            </form>
        </div>
    );
};

export default Regist;
