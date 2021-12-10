import { useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { SetState } from "types/utils";
import Presenter from "./Presenter";

type Props = {
  email: string;
  errors: any;
  setEmail: SetState<String>;
  resetPassword: () => Promise<boolean>;
};

const ResetPasswordTemplate: VFC<Props> = (props) => {
  const history = useHistory();

  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e: any) => props.setEmail(e.target.value);
  const handleModalToggle = () => setModalShow(!modalShow);
  const pushLogin = () => history.push("/login");

  const handleResetPassword = async () => {
    setLoading(true);
    const result = await props.resetPassword();
    console.log(result);

    if (result) {
      setModalShow(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Presenter
        resetPassword={handleResetPassword}
        email={props.email}
        errors={props.errors}
        loading={loading}
        handleChangeEmail={handleChangeEmail}
        pushLogin={pushLogin}
        modalShow={modalShow}
        handleModalToggle={handleModalToggle}
      />
    </>
  );
};
export default ResetPasswordTemplate;
