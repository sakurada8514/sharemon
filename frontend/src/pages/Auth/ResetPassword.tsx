import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import ResetPasswordForm from "../../components/Form/ResetPasswordForm";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import TransitionMotion from "../../components/Route/Motion";
import { OK, UNAUTHORIZED, VALIDATION } from "../../utils/constant";
import { BACK_COLOR_WHITE } from "../../utils/constant";
import ResetPasswordTemplate from "components/template/Auth/ResetPasswordTemplate";

import { resetPassword as resetPasswordApi } from "../../api/Auth/login";

export default function ResetPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  async function resetPassword() {
    const response = await resetPasswordApi(email);
    if (response.status === OK) {
      return true;
    } else if (
      response.status === UNAUTHORIZED ||
      response.status === VALIDATION
    ) {
      setErrors(response.data.errors);
    } else {
      history.push("/error");
    }
    return false;
  }

  return (
    <>
      <TransitionMotion>
        <ResetPasswordTemplate
          email={email}
          errors={errors}
          setEmail={setEmail}
          resetPassword={resetPassword}
        />
      </TransitionMotion>
    </>
  );
}
