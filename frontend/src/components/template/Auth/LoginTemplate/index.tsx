import React, { useGlobal, useState } from "reactn";
import { useHistory } from "react-router-dom";
import { VFC } from "react";

import Presenter from "./Presenter";

import { SetState } from "types/utils";
import { ChangeEvent } from "types/utils/event";

type Props = {
  login: () => Promise<void>;
  email: string;
  password: string;
  remember: boolean;
  errors: any[];
  setEmail: SetState<string>;
  setPassword: SetState<string>;
  setRemember: SetState<boolean>;
  setErrors: SetState<any[]>;
};

const LoginTemplate: VFC<Props> = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e: ChangeEvent) => props.setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent) =>
    props.setPassword(e.target.value);
  const handleChangeRemember = () => props.setRemember(!props.remember);

  const pushRegist = () => history.push("/regist");
  const pushPasswordReset = () => history.push("/password/reset/mail");

  const handleLogin = async () => {
    setLoading(true);
    await props.login();
    setLoading(false);
  };

  return (
    <Presenter
      handleLogin={handleLogin}
      email={props.email}
      password={props.password}
      remember={props.remember}
      errors={props.errors}
      loading={loading}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleChangeRemember={handleChangeRemember}
      pushRegist={pushRegist}
      pushPasswordReset={pushPasswordReset}
    />
  );
};
export default LoginTemplate;
