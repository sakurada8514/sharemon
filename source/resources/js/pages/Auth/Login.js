/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

import { setUser } from "../../stores/auth";
import { login as loginApi } from "../../api/login";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const history = useHistory();
    const dispatch = useDispatch();

    async function login(e) {
        e.preventDefault();
        const response = await loginApi(email, password);

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

    const hello = css({});
    return (
        <div>
            <form onSubmit={login}>
                <label>email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                />
                {typeof errors.email !== "undefined" && <p>{errors.email}</p>}
                <label>password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={handleChangePassword}
                />
                {typeof errors.password !== "undefined" && (
                    <p>{errors.password}</p>
                )}
                {typeof errors.auth !== "undefined" && <p>{errors.auth}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
