import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { setUser } from "../../stores/auth";
import { reregistPassword as reregistPasswordApi } from "../../api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "../../Const/constant";
import ReregistPasswordForm from "../../components/Form/ReregistPasswordForm";

export default function ReregistPassword() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);

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
            console.log("ok");
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
        <ReregistPasswordForm
            reregistPassword={reregistPassword}
            password={password}
            password_confirmation={password_confirmation}
            errors={errors}
            handleChangePassword={handleChangePassword}
            handleChangePasswordConfirmation={handleChangePasswordConfirmation}
            pushLogin={pushLogin}
        />
    );
}
