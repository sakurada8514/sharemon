import { React, useState, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import { inviteRegist as inviteRegistApi } from "../../api/Room/invite";
import { OK, UNAUTHORIZED, VALIDATION, FORBIDDEN } from "../../utils/constant";
import { BACK_COLOR_WHITE } from "../../utils/constant";
import RegistForm from "../../components/Form/RegistForm";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import TransitionMotion from "../../components/Route/Motion";
import useQuery from "../../utils/hooks/useQuery";

export default function InviteRegist() {
  const setUser = useGlobal("user")[1];
  const setError = useGlobal("error")[1];
  const history = useHistory();
  const query = useQuery();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [modalShow, setModalShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangePasswordConfirmation = (e) =>
    setPasswordConfirmation(e.target.value);
  const handleModalClose = () => setModalShow(false);
  const pushLogin = () => history.push("/login");

  async function regist(e) {
    e.preventDefault();
    setLoading(true);
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
      setError(true);
    }
    setLoading(false);
  }

  return (
    <>
      <TransitionMotion>
        <RegistForm
          regist={regist}
          name={name}
          email={email}
          password={password}
          password_confirmation={password_confirmation}
          errors={errors}
          isInvite={true}
          loading={loading}
          handleChangeName={handleChangeName}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          handleChangePasswordConfirmation={handleChangePasswordConfirmation}
          pushLogin={pushLogin}
        />
      </TransitionMotion>

      <ModalTemplate
        show={modalShow}
        handleModalClose={handleModalClose}
        body={modalBody(handleModalClose)}
      />
    </>
  );
}

//モーダル
function modalBody(handleModalClose) {
  const classes = modalStyles();

  return (
    <div className={classes.root}>
      <h1>ルーム招待が届いています。</h1>
      <p>新規登録してルームに参加しましょう！</p>
      <Button variant="contained" color="secondary" onClick={handleModalClose}>
        閉じる
      </Button>
    </div>
  );
}

const modalStyles = makeStyles(() => ({
  root: {
    width: "90%",
    maxWidth: "400px",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACK_COLOR_WHITE,
    "&:focus-visible": {
      outline: "none",
    },
    borderRadius: "10px",
    "& > h1": {
      marginBottom: "8px",
    },
    "& > p": {
      marginBottom: "16px",
    },
  },
}));
