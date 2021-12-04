import React, { VFC } from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import LoadingButton from "components/Atoms/Buttons/LoadingButton";
import { ChangeEvent } from "types/utils/event";

type Props = {
  email: string;
  password: string;
  remember: boolean;
  loading: boolean;
  errors: any;
  handleLogin: () => Promise<void>;
  handleChangeEmail: (e: ChangeEvent) => void;
  handleChangePassword: (e: ChangeEvent) => void;
  handleChangeRemember: () => void;
  pushRegist: () => void;
  pushPasswordReset: () => void;
};

const Presenter: VFC<Props> = (props) => {
  return (
    <div className="flex items-center bg-gray-50 min-h-screen">
      <Container component="main" maxWidth="xs">
        <div className="flex flex-col items-center">
          <Avatar className="bg-green-500 m-2">
            <LockOutlinedIcon className="bg-green-500" />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
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
              error={
                typeof props.errors.email !== "undefined" ||
                typeof props.errors.auth !== "undefined"
              }
              helperText={props.errors.email}
            />
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
            <FormControlLabel
              control={
                <Checkbox
                  value={props.remember}
                  color="primary"
                  onClick={props.handleChangeRemember}
                />
              }
              label="ログインを維持する"
            />
            <LoadingButton
              handleButtonClick={props.handleLogin}
              text={"ログイン"}
              loading={props.loading}
              fullWidth={true}
            />
            <div className="flex justify-between px-6 mt-4">
              <Link
                color="secondary"
                variant="body2"
                onClick={props.pushRegist}
                className="cursor-pointer"
              >
                {"ユーザー登録"}
              </Link>
              <Link
                color="secondary"
                variant="body2"
                onClick={props.pushPasswordReset}
                className="cursor-pointer"
              >
                {"パスワードリセット"}
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Presenter;
