import { useState, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";

import { inviteRegist as inviteRegistApi } from "api/Room/invite";
import { OK, UNAUTHORIZED, VALIDATION, FORBIDDEN } from "utils/constant";
import TransitionMotion from "components/Route/Motion";
import useQuery from "utils/hooks/useQuery";

import InviteRegistTemplate from "components/template/Auth/InviteRegistTemplate/Index";

const InviteRegist = () => {
  const setUser = useGlobal("user")[1];
  const history = useHistory();
  const query = useQuery();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  async function regist() {
    const response = await inviteRegistApi(
      name,
      email,
      password,
      password_confirmation,
      query.get("invitee"),
      query.get("token")
    );

    if (response.status === OK) {
      setUser(response.data.user);
      history.push("/mypage");
    } else if (
      response.status === UNAUTHORIZED ||
      response.status === VALIDATION ||
      response.status === FORBIDDEN
    ) {
      setErrors(response.data.errors);
    } else {
      history.push("/error");
    }
  }

  return (
    <>
      <TransitionMotion>
        <InviteRegistTemplate
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
    </>
  );
};

export default InviteRegist;
