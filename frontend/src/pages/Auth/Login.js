import React, { useState, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";

import { login as loginApi } from "../../api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "../../utils/constant";
import LoginForm from "../../components/Form/LoginForm";
import TransitionMotion from "../../components/Route/Motion";

export default function Login() {
  const history = useHistory();
  const setUser = useGlobal("user")[1];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeRemember = (e) => setRemember(!remember);
  const pushRegist = () => history.push("/regist");
  const pushPasswordReset = () => history.push("/password/reset/mail");

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    const response = await loginApi(email, password, remember);

    if (response.status === OK) {
      setUser(response.data.user);
      history.push("/regist/room");
    } else if (
      response.status === UNAUTHORIZED ||
      response.status === VALIDATION
    ) {
      setLoading(false);
      setErrors(response.data.errors);
    } else {
      history.push("/error");
    }
  }

  return (
    <TransitionMotion>
      <LoginForm
        login={login}
        email={email}
        password={password}
        remember={remember}
        errors={errors}
        loading={loading}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleChangeRemember={handleChangeRemember}
        pushRegist={pushRegist}
        pushPasswordReset={pushPasswordReset}
      />
    </TransitionMotion>
  );
}
