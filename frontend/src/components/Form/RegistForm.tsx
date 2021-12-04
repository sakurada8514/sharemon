import React, { VFC } from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import LoadingButton from "components/Atoms/Buttons/LoadingButton";
import { ChangeEvent } from "types/utils/event";

type Props = {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
  isInvite: boolean;
  loading: boolean;
  errors: any;
  regist: () => Promise<void>;
  handleChangeEmail: (e: ChangeEvent) => void;
  handleChangePassword: (e: ChangeEvent) => void;
  handleChangeName: (e: ChangeEvent) => void;
  handleChangePasswordConfirmation: (e: ChangeEvent) => void;
  pushLogin: () => void;
};
const RegistForm: VFC<Props> = (props) => {
  return (
    <div className="flex items-center bg-gray-50 min-h-screen">
      <Container component="main" maxWidth="xs">
        <div className="flex flex-col items-center">
          <Avatar className="bg-green-500 m-2">
            <LockOutlinedIcon className="bg-green-500" />
          </Avatar>
          <Typography component="h1" variant="h5">
            ユーザー登録
          </Typography>
          <form className="w-full mt-2">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="ユーザー名"
              name="name"
              autoComplete="name"
              autoFocus
              value={props.name}
              onChange={props.handleChangeName}
              error={
                typeof props.errors.name !== "undefined" ||
                typeof props.errors.auth !== "undefined"
              }
              helperText={props.errors.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
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
              helperText={props.errors.password}
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
              handleButtonClick={props.regist}
              text={"登録"}
              loading={props.loading}
              fullWidth={true}
            />
            <Box display="flex" justifyContent="center" className="mt-4">
              {!props.isInvite && (
                <Link
                  color="secondary"
                  variant="body2"
                  onClick={props.pushLogin}
                  className="cursor-pointer"
                >
                  {"ログイン"}
                </Link>
              )}
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default RegistForm;
