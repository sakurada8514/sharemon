import React, { useState, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { regist as registApi } from "../../api/Auth/regist";
import { OK, UNAUTHORIZED, VALIDATION } from "../../utils/constant";
import RegistForm from "../../components/Form/RegistForm";
import TransitionMotion from "../../components/Route/Motion";

export default function Regist() {
  const history = useHistory();
  const setUser = useGlobal("user")[1];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeName = (e: any) => setName(e.target.value);
  const handleChangeEmail = (e: any) => setEmail(e.target.value);
  const handleChangePassword = (e: any) => setPassword(e.target.value);
  const handleChangePasswordConfirmation = (e: any) =>
    setPasswordConfirmation(e.target.value);
  const pushLogin = () => history.push("/login");

  async function regist(e: any) {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      setErrors(response.data.errors);
    } else {
      history.push("/error");
    }
  }

  return (
    <TransitionMotion>
      <RegistForm
        regist={regist}
        name={name}
        email={email}
        password={password}
        password_confirmation={password_confirmation}
        errors={errors}
        isInvite={false}
        handleChangeName={handleChangeName}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleChangePasswordConfirmation={handleChangePasswordConfirmation}
        pushLogin={pushLogin}
        loading={loading}
      />
    </TransitionMotion>
  );
}
