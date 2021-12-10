import { useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { SetState } from "types/utils";
import Presenter from "./Presenter";

type Props = {
  reregistPassword: () => Promise<boolean>;
  password: string;
  password_confirmation: string;
  errors: any;
  setPassword: SetState<String>;
  setPasswordConfirmation: SetState<String>;
};

const ReregistPasswordTemplate: VFC<Props> = (props) => {
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = (e: any) => props.setPassword(e.target.value);
  const handleChangePasswordConfirmation = (e: any) =>
    props.setPasswordConfirmation(e.target.value);
  const pushLogin = () => history.push("/login");

  const handleReregistPassword = async () => {
    setLoading(true);
    const result = await props.reregistPassword();
    console.log(result);

    if (result) {
      setModalShow(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Presenter
        reregistPassword={handleReregistPassword}
        password={props.password}
        password_confirmation={props.password_confirmation}
        errors={props.errors}
        handleChangePassword={handleChangePassword}
        handleChangePasswordConfirmation={handleChangePasswordConfirmation}
        pushLogin={pushLogin}
        loading={loading}
        modalShow={modalShow}
      />
    </>
  );
};

export default ReregistPasswordTemplate;
