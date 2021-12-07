import React, { useState } from "reactn";
import { useHistory } from "react-router-dom";

import RegistForm from "components/Form/RegistForm";
import Presenter from "./Presenter";
import { VFC } from "react";
import { SetState } from "types/utils";
import { ChangeEvent } from "types/utils/event";

type Props = {
  regist: () => Promise<void>;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors: any[];
  setName: SetState<string>;
  setEmail: SetState<string>;
  setPassword: SetState<string>;
  setPasswordConfirmation: SetState<string>;
  setErrors: SetState<any[]>;
};

const RegistTemplate: VFC<Props> = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleChangeName = (e: ChangeEvent) => props.setName(e.target.value);
  const handleChangeEmail = (e: ChangeEvent) => props.setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent) =>
    props.setPassword(e.target.value);
  const handleChangePasswordConfirmation = (e: ChangeEvent) =>
    props.setPasswordConfirmation(e.target.value);
  const pushLogin = () => history.push("/login");

  const handleRegist = async () => {
    setLoading(true);
    await props.regist();
    setLoading(false);
  };

  return (
    <Presenter>
      <RegistForm
        regist={handleRegist}
        name={props.name}
        email={props.email}
        password={props.password}
        password_confirmation={props.password_confirmation}
        errors={props.errors}
        isInvite={false}
        handleChangeName={handleChangeName}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleChangePasswordConfirmation={handleChangePasswordConfirmation}
        pushLogin={pushLogin}
        loading={loading}
      />
    </Presenter>
  );
};
export default RegistTemplate;
