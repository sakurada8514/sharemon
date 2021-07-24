/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

import { setUser } from "../../stores/auth";
import { regist as registApi } from "../../api/Auth/regist";
import { OK, UNAUTHORIZED, VALIDATION } from "../../constant";
import RegistForm from "../../components/Form/RegistForm";

export default function Regist() {
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
        <RegistForm
            regist={regist}
            name={name}
            email={email}
            password={password}
            password_confirmation={password_confirmation}
            errors={errors}
            handleChangeName={handleChangeName}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            handleChangePasswordConfirmation={handleChangePasswordConfirmation}
            pushLogin={pushLogin}
        />
    );
}
