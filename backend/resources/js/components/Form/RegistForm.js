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

import { BACK_COLOR_GREEN, SUB_COLOR_GREEN } from "../../Const/styleConstant";

export default function RegistForm(props) {
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
                        ユーザー登録
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={props.regist}
                        noValidate
                    >
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
                            error={typeof props.errors.name !== "undefined"}
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
                            error={typeof props.errors.email !== "undefined"}
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
                            error={typeof props.errors.password !== "undefined"}
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            登録
                        </Button>
                        <Box display="flex" justifyContent="center">
                            <Link
                                color="secondary"
                                variant="body2"
                                onClick={props.pushLogin}
                                className={
                                    props.isInvite
                                        ? classes.linkNone
                                        : classes.link
                                }
                            >
                                {"ログイン"}
                            </Link>
                        </Box>
                    </form>
                </div>
            </Container>
        </div>
    );
}

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
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: SUB_COLOR_GREEN,
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
    linkNone: {
        cursor: "pointer",
        display: "none",
    },
}));
