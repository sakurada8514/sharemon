import { useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import ModalTemplate from "components/Modal/ModalTemplate";
import TransitionMotion from "components/Route/Motion";
import { OK, UNAUTHORIZED, VALIDATION } from "utils/constant";
import { BACK_COLOR_WHITE } from "utils/constant";
import useQuery from "utils/hooks/useQuery";

import { reregistPassword as reregistPasswordApi } from "api/Auth/login";
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

  const handleReregistPassword = () => {
    setLoading(true);
    const result = props.reregistPassword;
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
      />

      <ModalTemplate
        show={modalShow}
        handleModalClose={pushLogin}
        body={modalBody(pushLogin)}
      />
    </>
  );
};

export default ReregistPasswordTemplate;
//モーダル
function modalBody(handleModalToggle: () => void) {
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
