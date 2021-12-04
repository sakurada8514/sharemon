import React, { useState, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";

import { regist as registApi } from "api/Auth/regist";
import { OK, UNAUTHORIZED, VALIDATION } from "utils/constant";
import TransitionMotion from "components/Route/Motion";
import RegistTemplate from "components/template/Auth/RegistTemplate";

export default function Regist() {
  const history = useHistory();
  const setUser = useGlobal("user")[1];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  async function regist() {
    const response = await registApi(
      name,
      email,
      password,
      password_confirmation
    );

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
      <RegistTemplate
        regist={regist}
        name={name}
        email={email}
        password={password}
        password_confirmation={password_confirmation}
        errors={errors}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
        setErrors={setErrors}
      />
    </TransitionMotion>
  );
}
