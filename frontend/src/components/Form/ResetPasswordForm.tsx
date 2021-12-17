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
import LoadingButton from "../Base/Buttons/LoadingButton";

type ResetPasswordFormProps = {
  email: string;
  errors: any;
  loading: boolean;
  resetPassword: (e: any) => Promise<void>;
  handleChangeEmail: (e: any) => void;
  pushLogin: (e: any) => void;
};
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  errors,
  loading,
  resetPassword,
  handleChangeEmail,
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
              value={email}
              onChange={handleChangeEmail}
              error={typeof errors.email !== "undefined"}
              helperText={errors.email}
              className="mb-6"
            />
            <LoadingButton
              handleButtonClick={resetPassword}
              text={"リセットメール送信"}
              loading={loading}
              fullWidth={true}
            />
            <Box className="flex justify-center mt-4">
              <Link
                color="secondary"
                variant="body2"
                onClick={pushLogin}
                className="cursor-pointer"
              >
                {"ログインへ戻る"}
              </Link>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPasswordForm;
