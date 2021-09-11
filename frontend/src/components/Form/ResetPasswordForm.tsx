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
  const classes = useStyles();

  return (
    <div className={classes.allWrapper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.icon} />
          </Avatar>
          <Typography component="h1" variant="h5">
            パスワードリセット
          </Typography>
          <form className={classes.form}>
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
              className={classes.lastTextField}
            />
            <LoadingButton
              handleButtonClick={resetPassword}
              text={"リセットメール送信"}
              loading={loading}
              fullWidth={true}
            />
            <Box className={classes.linkArea}>
              <Link
                color="secondary"
                variant="body2"
                onClick={pushLogin}
                className={classes.link}
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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: SUB_COLOR_GREEN,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  icon: {
    backgroundColor: SUB_COLOR_GREEN,
  },
  allWrapper: {
    height: "100vh",
    backgroundColor: BACK_COLOR_GREEN,
    display: "flex",
    alignItems: "center",
  },
  linkArea: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  link: {
    cursor: "pointer",
  },
  lastTextField: {
    marginBottom: theme.spacing(3),
  },
}));

export default ResetPasswordForm;
