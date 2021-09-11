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

type ReregistPasswordFormProps = {
  password: string;
  password_confirmation: string;
  errors: any;
  loading: boolean;
  reregistPassword: (e: any) => Promise<void>;
  handleChangePasswordConfirmation: (e: any) => void;
  handleChangePassword: (e: any) => void;
  pushLogin: (e: any) => void;
};
const ReregistPasswordForm: React.FC<ReregistPasswordFormProps> = ({
  password,
  password_confirmation,
  errors,
  loading,
  reregistPassword,
  handleChangePassword,
  handleChangePasswordConfirmation,
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
            パスワード再設定
          </Typography>
          <form className={classes.form}>
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
              className={classes.lastTextField}
              error={typeof errors.auth !== "undefined"}
              helperText={errors.auth}
            />
            <LoadingButton
              handleButtonClick={reregistPassword}
              text={"パスワード再設定"}
              loading={loading}
              fullWidth={true}
            />
            <Box
              display="flex"
              justifyContent="center"
              className={classes.linkArea}
            >
              <Link
                color="secondary"
                variant="body2"
                onClick={pushLogin}
                className={classes.link}
              >
                {"ログイン"}
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
  linkArea: {
    marginTop: theme.spacing(2),
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
  link: {
    cursor: "pointer",
  },
  lastTextField: {
    marginBottom: theme.spacing(3),
  },
}));

export default ReregistPasswordForm;
