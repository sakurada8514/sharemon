import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LoadingButton from "../Atoms/Buttons/LoadingButton";
import { BACK_COLOR_GREEN, SUB_COLOR_GREEN } from "../../utils/constant";

type LoginFormProps = {
  email: string;
  password: string;
  remember: boolean;
  loading: boolean;
  errors: any;
  login: (e: any) => Promise<void>;
  handleChangeEmail: (e: any) => void;
  handleChangePassword: (e: any) => void;
  handleChangeRemember: (e: any) => void;
  pushRegist: () => void;
  pushPasswordReset: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  remember,
  errors,
  loading,
  handleChangeEmail,
  handleChangePassword,
  login,
  handleChangeRemember,
  pushRegist,
  pushPasswordReset,
}) => {
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
              helperText={errors.password || errors.auth}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={remember}
                  color="primary"
                  onClick={handleChangeRemember}
                />
              }
              label="ログインを維持する"
            />
            <LoadingButton
              handleButtonClick={login}
              text={"ログイン"}
              loading={loading}
              fullWidth={true}
            />
            <Box className="flex justify-between px-6 mt-4">
              <Link
                color="secondary"
                variant="body2"
                onClick={pushRegist}
                className="cursor-pointer"
              >
                {"ユーザー登録"}
              </Link>
              <Link
                color="secondary"
                variant="body2"
                onClick={pushPasswordReset}
                className="cursor-pointer"
              >
                {"パスワードリセット"}
              </Link>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
