import { useState } from "reactn";
import { useHistory } from "react-router-dom";
import { VFC } from "react";

import RegistForm from "components/Form/RegistForm";
import Presenter from "./Presenter";

import { SetState } from "types/utils";

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

const InviteRegistTemplate: VFC<Props> = (props) => {
  const history = useHistory();

  const [modalShow, setModalShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangeName = (e: any) => props.setName(e.target.value);
  const handleChangeEmail = (e: any) => props.setEmail(e.target.value);
  const handleChangePassword = (e: any) => props.setPassword(e.target.value);
  const handleChangePasswordConfirmation = (e: any) =>
    props.setPasswordConfirmation(e.target.value);
  const handleModalClose = () => setModalShow(false);
  const pushLogin = () => history.push("/login");

  const handleRegist = async () => {
    setLoading(true);
    await props.regist;
    setLoading(false);
  };

  return (
    <>
      <Presenter modalShow={modalShow} handleModalClose={handleModalClose}>
        <RegistForm
          regist={handleRegist}
          name={props.name}
          email={props.email}
          password={props.password}
          password_confirmation={props.password_confirmation}
          errors={props.errors}
          isInvite={true}
          loading={loading}
          handleChangeName={handleChangeName}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          handleChangePasswordConfirmation={handleChangePasswordConfirmation}
          pushLogin={pushLogin}
        />
      </Presenter>
    </>
  );
};

export default InviteRegistTemplate;
