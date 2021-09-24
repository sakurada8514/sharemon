import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import ModalTemplate from "../Modal/ModalTemplate";
import LoadingButton from "../Atoms/Buttons/LoadingButton";

type RegistRoomFormProps = {
  roomName: string;
  modalShow: boolean;
  loading: boolean;
  createRoom: (e: any) => Promise<void>;
  handleChangeRoomName: (e: any) => void;
  handleClickLink: (e: any) => void;
  handleModalClose: () => void;
};
const RegistRoomForm: React.FC<RegistRoomFormProps> = ({
  roomName,
  modalShow,
  loading,
  createRoom,
  handleChangeRoomName,
  handleClickLink,
  handleModalClose,
}) => {
  return (
    <div className="flex items-center bg-gray-50 min-h-screen">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="flex flex-col items-center">
          <Avatar className="bg-green-500 m-2">
            <HomeIcon className="bg-green-500" />
          </Avatar>
          <Typography component="h1" variant="h5">
            ルーム作成
          </Typography>
          <form className="w-full mt-2">
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
              className="mb-6"
            />
            <LoadingButton
              handleButtonClick={createRoom}
              text={"ルーム作成"}
              loading={loading}
              fullWidth={true}
            />
            <Box display="flex" justifyContent="center" className="mt-4">
              <Link
                color="secondary"
                variant="body2"
                onClick={handleClickLink}
                className="cursor-pointer"
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

export default RegistRoomForm;
