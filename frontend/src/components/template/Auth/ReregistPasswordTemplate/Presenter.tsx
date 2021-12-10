import React, { VFC } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { BACK_COLOR_WHITE } from "utils/constant";
import LoadingButton from "../../../Atoms/Buttons/LoadingButton";
import ModalTemplate from "components/Modal/ModalTemplate";

type Props = {
  password: string;
  password_confirmation: string;
  errors: any;
  loading: boolean;
  modalShow: boolean;
  reregistPassword: () => void;
  handleChangePasswordConfirmation: (e: any) => void;
  handleChangePassword: (e: any) => void;
  pushLogin: () => void;
};
const Presenter: VFC<Props> = (props) => {
  return (
    <>
      <div className="flex items-center bg-gray-50 min-h-screen">
        <Container component="main" maxWidth="xs">
          <div className="flex flex-col items-center">
            <Avatar className="bg-green-500 m-2">
              <LockOutlinedIcon className="bg-green-500" />
            </Avatar>
            <Typography component="h1" variant="h5">
              パスワード再設定
            </Typography>
            <form className="w-full mt-2">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                value={props.password}
                onChange={props.handleChangePassword}
                error={
                  typeof props.errors.password !== "undefined" ||
                  typeof props.errors.auth !== "undefined"
                }
                helperText={props.errors.password || props.errors.auth}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="パスワード確認"
                type="password"
                id="password_confirmation"
                autoComplete="current-password_confirmation"
                value={props.password_confirmation}
                onChange={props.handleChangePasswordConfirmation}
                className="mb-6"
                error={typeof props.errors.auth !== "undefined"}
                helperText={props.errors.auth}
              />
              <LoadingButton
                handleButtonClick={props.reregistPassword}
                text={"パスワード再設定"}
                loading={props.loading}
                fullWidth={true}
              />
              <Box display="flex" justifyContent="center" className="mt-4">
                <Link
                  color="secondary"
                  variant="body2"
                  onClick={props.pushLogin}
                  className="cursor-pointer"
                >
                  {"ログイン"}
                </Link>
              </Box>
            </form>
          </div>
        </Container>
      </div>

      <ModalTemplate
        show={props.modalShow}
        handleModalClose={props.pushLogin}
        body={modalBody(props.pushLogin)}
      />
    </>
  );
};

export default Presenter;
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
