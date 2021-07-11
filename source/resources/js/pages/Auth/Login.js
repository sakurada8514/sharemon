/** @jsxImportSource @emotion/react */

import { React, useState, useEffect } from "react";
import { css } from "@emotion/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    // ログイン
    const login = async (e) => {
        e.preventDefault();
        // ログイン時にCSRFトークンを初期化
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/api/login", {
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.result) {
                        console.log("[login]ログイン成功");
                        setUser(res.data.user);
                    } else {
                        console.log(res.data.message);
                        console.log("[login]ログイン失敗");
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    console.log("[login]ログイン失敗");
                });
        });
    };
    const hello = css({});
    return (
        <div>
            <p css={hello}>aaaa</p>
            <form onSubmit={login}>
                <label css={hello}>email</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                />
                <label>password</label>
                <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
