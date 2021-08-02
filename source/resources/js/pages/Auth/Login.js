import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../../stores/auth";
import { login as loginApi } from "../../api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";
import LoginForm from "../../components/Form/LoginForm";

export default function Login() {
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
        <LoginForm
            login={login}
            email={email}
            password={password}
            remember={remember}
            errors={errors}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            handleChangeRemember={handleChangeRemember}
            pushRegist={pushRegist}
        />
    );
}
