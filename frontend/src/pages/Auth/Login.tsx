import React, { useState, useGlobal } from "reactn";
import { useHistory } from "react-router";

import TransitionMotion from "components/Route/Motion";
import LoginTemplate from "components/template/Auth/LoginTemplate";
import { login as loginApi } from "api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "utils/constant";

export default function Login() {
  const history = useHistory();
  const setUser = useGlobal("user")[1];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);

  async function login() {
    const response = await loginApi(email, password, remember);

    if (response.status === OK) {
      setUser(response.data.user);
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
    <TransitionMotion>
      <LoginTemplate
        login={login}
        email={email}
        password={password}
        remember={remember}
        errors={errors}
        setEmail={setEmail}
        setPassword={setPassword}
        setRemember={setRemember}
        setErrors={setErrors}
      />
    </TransitionMotion>
  );
}
