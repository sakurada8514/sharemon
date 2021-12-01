import React, { useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import { VFC } from "react";

import Presenter from "./Presenter";

import { login as loginApi } from "api/Auth/login";
import { OK, UNAUTHORIZED, VALIDATION } from "utils/constant";
import { SetState } from "types/utils";
import { ChangeEvent } from "types/utils/event";

type Props = {
  email: string;
  password: string;
  remember: boolean;
  errors: any[];
  loading: boolean;
  setEmail: SetState<string>;
  setPassword: SetState<string>;
  setRemember: SetState<boolean>;
  setErrors: SetState<any[]>;
  setLoading: SetState<boolean>;
};

const LoginTemplate: VFC<Props> = (props) => {
  const history = useHistory();
  const setUser = useGlobal("user")[1];

  const handleChangeEmail = (e: ChangeEvent) => props.setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent) =>
    props.setPassword(e.target.value);
  const handleChangeRemember = () => props.setRemember(!props.remember);

  const pushRegist = () => history.push("/regist");
  const pushPasswordReset = () => history.push("/password/reset/mail");

  async function login() {
    props.setLoading(true);
    const response = await loginApi(
      props.email,
      props.password,
      props.remember
    );

    if (response.status === OK) {
      setUser(response.data.user);
      history.push("/regist/room");
    } else if (
      response.status === UNAUTHORIZED ||
      response.status === VALIDATION
    ) {
      props.setLoading(false);
      props.setErrors(response.data.errors);
    } else {
      history.push("/error");
    }
  }

  return (
    <Presenter
      login={login}
      email={props.email}
      password={props.password}
      remember={props.remember}
      errors={props.errors}
      loading={props.loading}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleChangeRemember={handleChangeRemember}
      pushRegist={pushRegist}
      pushPasswordReset={pushPasswordReset}
    />
  );
};
export default LoginTemplate;
