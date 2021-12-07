import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import ModalTemplate from "../../components/Modal/ModalTemplate";
import TransitionMotion from "../../components/Route/Motion";
import { OK, UNAUTHORIZED, VALIDATION } from "../../utils/constant";
import { BACK_COLOR_WHITE } from "../../utils/constant";
import useQuery from "../../utils/hooks/useQuery";
import ReregistPasswordTemplate from "components/template/Auth/ReregistPasswordTemplate";

import { reregistPassword as reregistPasswordApi } from "../../api/Auth/login";

export default function ReregistPassword() {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const query = useQuery();

  async function reregistPassword(): Promise<boolean> {
    const response = await reregistPasswordApi(
      query.get("token"),
      query.get("email"),
      password,
      password_confirmation
    );

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
        <ReregistPasswordTemplate
          reregistPassword={reregistPassword}
          password={password}
          password_confirmation={password_confirmation}
          errors={errors}
          setPassword={setPassword}
          setPasswordConfirmation={setPasswordConfirmation}
        />
      </TransitionMotion>
    </>
  );
}
