import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import ModalTemplate from "../../components/Modal/ModalTemplate";
import ReregistPasswordForm from "../../components/Form/ReregistPasswordForm";
import TransitionMotion from "../../components/Route/Motion";
import { OK, UNAUTHORIZED, VALIDATION } from "../../utils/constant";
import { BACK_COLOR_WHITE } from "../../utils/constant";
import useQuery from "../../utils/hooks/useQuery";

import { reregistPassword as reregistPasswordApi } from "../../api/Auth/login";

export default function ReregistPassword() {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangePasswordConfirmation = (e) =>
    setPasswordConfirmation(e.target.value);
  const pushLogin = () => history.push("/login");

  const query = useQuery();

  async function reregistPassword(e) {
    setLoading(true);
    e.preventDefault();

    const response = await reregistPasswordApi(
      query.get("token"),
      query.get("email"),
      password,
      password_confirmation
    );

    if (response.status === OK) {
      setLoading(false);
      setModalShow(true);
    } else if (
      response.status === UNAUTHORIZED ||
      response.status === VALIDATION
    ) {
      setLoading(false);
      setErrors(response.data.errors);
    } else {
      history.push("/error");
    }
  }

  return (
    <>
      <TransitionMotion>
        <ReregistPasswordForm
          reregistPassword={reregistPassword}
          password={password}
          password_confirmation={password_confirmation}
          errors={errors}
          handleChangePassword={handleChangePassword}
          handleChangePasswordConfirmation={handleChangePasswordConfirmation}
          pushLogin={pushLogin}
          loading={loading}
        />
      </TransitionMotion>
      <ModalTemplate
        show={modalShow}
        handleModalClose={pushLogin}
        body={modalBody(pushLogin)}
      />
    </>
  );
}
//モーダル
function modalBody(handleModalToggle) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <h1>パスワードのリセットが完了しました。</h1>
      <p>ログインフォームへ戻りログインして下さい。</p>
      <Button variant="contained" color="secondary" onClick={handleModalToggle}>
        ログインフォームへ
      </Button>
    </div>
  );
}

const styles = makeStyles(() => ({
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
      marginBottom: "24px",
    },
  },
}));
