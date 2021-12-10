import React, { VFC } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {
  BACK_COLOR_GREEN,
  BACK_COLOR_WHITE,
  SUB_COLOR_GREEN,
} from "utils/constant";
import LoadingButton from "../../../Atoms/Buttons/LoadingButton";
import ModalTemplate from "components/Modal/ModalTemplate";

type Props = {
  email: string;
  errors: any;
  loading: boolean;
  resetPassword: () => Promise<void>;
  handleChangeEmail: (e: any) => void;
  pushLogin: () => void;
  modalShow: boolean;
  handleModalToggle: () => void;
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
              パスワードリセット
            </Typography>
            <form className="w-full mt-2">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                value={props.email}
                onChange={props.handleChangeEmail}
                error={typeof props.errors.email !== "undefined"}
                helperText={props.errors.email}
                className="mb-6"
              />
              <LoadingButton
                handleButtonClick={props.resetPassword}
                text={"リセットメール送信"}
                loading={props.loading}
                fullWidth={true}
              />
              <Box className="flex justify-center mt-4">
                <Link
                  color="secondary"
                  variant="body2"
                  onClick={props.pushLogin}
                  className="cursor-pointer"
                >
                  {"ログインへ戻る"}
                </Link>
              </Box>
            </form>
          </div>
        </Container>
      </div>
      <ModalTemplate
        show={props.modalShow}
        handleModalClose={props.handleModalToggle}
        body={modalBody(props.handleModalToggle)}
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
      <h1>ご登録のメールアドレスにリセット用のURLを送信しました。</h1>
      <Button variant="contained" color="secondary" onClick={handleModalToggle}>
        閉じる
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
      marginBottom: "24px",
    },
  },
}));
