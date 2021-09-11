import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { BACK_COLOR_GREEN, SUB_COLOR_GREEN } from "../../utils/constant";
import ModalTemplate from "../Modal/ModalTemplate";

type RegistRoomFormProps = {
  createRoom: (e: any) => Promise<void>;
  roomName: string;
  handleChangeRoomName: (e: any) => void;
  modalShow: boolean;
  handleClickLink: (e: any) => void;
  handleModalClose: () => void;
};
const RegistRoomForm: React.FC<RegistRoomFormProps> = ({
  createRoom,
  roomName,
  handleChangeRoomName,
  modalShow,
  handleClickLink,
  handleModalClose,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.allWrapper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeIcon className={classes.icon} />
          </Avatar>
          <Typography component="h1" variant="h5">
            ルーム作成
          </Typography>
          <form className={classes.form} onSubmit={createRoom} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="roomName"
              label="ルーム名"
              name="roomName"
              autoComplete="roomName"
              autoFocus
              value={roomName}
              onChange={handleChangeRoomName}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ルーム作成
            </Button>
            <Box display="flex" justifyContent="center">
              <Link
                color="secondary"
                variant="body2"
                onClick={handleClickLink}
                className={classes.link}
              >
                {"ルームとは？"}
              </Link>
            </Box>
          </form>
        </div>
      </Container>
      <ModalTemplate
        show={modalShow}
        handleModalClose={handleModalClose}
        body={<p>ppp</p>}
      />
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
}));
export default RegistRoomForm;
