import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../../stores/auth";
import { resetPassword as resetPasswordApi } from "../../api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "../../Const/constant";
import ResetPasswordForm from "../../components/Form/ResetPasswordForm";

export default function ResetPassword() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const pushLogin = () => history.push("/login");

    async function resetPassword(e) {
        e.preventDefault();
        const response = await resetPasswordApi(email);
        console.log(response);
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

    return (
        <ResetPasswordForm
            resetPassword={resetPassword}
            email={email}
            errors={errors}
            handleChangeEmail={handleChangeEmail}
            pushRegist={pushLogin}
        />
    );
}
