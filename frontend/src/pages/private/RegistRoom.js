import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createRoom as createRoomApi } from "../../api/Room/room";
import { setUser } from "../../stores/auth";
import { OK, VALIDATION } from "../../utils/constant";
import RegistRoomForm from "../../components/Form/RegistRoomForm";
import TransitionMotion from "../../components/Route/Motion";

export default function RegistRoom() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [roomName, setRoomName] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleChangeRoomName = (e) => setRoomName(e.target.value);
  const handleModalOpen = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  async function createRoom(e) {
    e.preventDefault();
    const response = await createRoomApi(roomName);

    if (response.status === OK) {
      dispatch(setUser(response.data.user));
      history.push("/mypage");
    } else if (response.status === VALIDATION) {
      alert("既にルームを設定済みです。マイページへ移動します。");
      history.push("/mypage");
    } else {
      history.push("/error");
    }
  }

  return (
    <TransitionMotion
      contents={
        <RegistRoomForm
          createRoom={createRoom}
          roomName={roomName}
          handleChangeRoomName={handleChangeRoomName}
          modalShow={modalShow}
          handleClickLink={handleModalOpen}
          handleModalClose={handleModalClose}
        />
      }
    />
  );
}
