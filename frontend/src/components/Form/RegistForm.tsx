import React from "react";
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

import { BACK_COLOR_GREEN, SUB_COLOR_GREEN } from "../../utils/constant";
import LoadingButton from "../Atoms/Buttons/LoadingButton";

type RegistFormProps = {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
  isInvite: boolean;
  loading: boolean;
  errors: any;
  regist: (e: any) => Promise<void>;
  handleChangeEmail: (e: any) => void;
  handleChangePassword: (e: any) => void;
  handleChangeName: (e: any) => void;
  handleChangePasswordConfirmation: (e: any) => void;
  pushLogin: (e: any) => void;
};
const RegistForm: React.FC<RegistFormProps> = ({
  email,
  password,
  name,
  password_confirmation,
  isInvite,
  loading,
  errors,
  handleChangeEmail,
  handleChangePassword,
  regist,
  handleChangeName,
  handleChangePasswordConfirmation,
  pushLogin,
}) => {
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
              value={name}
              onChange={handleChangeName}
              error={
                typeof errors.name !== "undefined" ||
                typeof errors.auth !== "undefined"
              }
              helperText={errors.name}
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
              value={email}
              onChange={handleChangeEmail}
              error={
                typeof errors.email !== "undefined" ||
                typeof errors.auth !== "undefined"
              }
              helperText={errors.email}
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
              value={password}
              onChange={handleChangePassword}
              error={
                typeof errors.password !== "undefined" ||
                typeof errors.auth !== "undefined"
              }
              helperText={errors.password}
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
              value={password_confirmation}
              onChange={handleChangePasswordConfirmation}
              className="mb-6"
              error={typeof errors.auth !== "undefined"}
              helperText={errors.auth}
            />
            <LoadingButton
              handleButtonClick={regist}
              text={"登録"}
              loading={loading}
              fullWidth={true}
            />
            <Box display="flex" justifyContent="center" className="mt-4">
              {!isInvite && (
                <Link
                  color="secondary"
                  variant="body2"
                  onClick={pushLogin}
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
