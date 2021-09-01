import React, { useState, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";

import { createRoom as createRoomApi } from "../../api/Room/room";
import { OK, VALIDATION } from "../../utils/constant";
import RegistRoomForm from "../../components/Form/RegistRoomForm";
import TransitionMotion from "../../components/Route/Motion";

export default function RegistRoom() {
  const history = useHistory();
  const setUser = useGlobal("user")[1];

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
      setUser(response.data.user);
      history.push("/mypage");
    } else if (response.status === VALIDATION) {
      alert("既にルームを設定済みです。マイページへ移動します。");
      history.push("/mypage");
    } else {
      history.push("/error");
    }
  }

  return (
    <TransitionMotion>
      <RegistRoomForm
        createRoom={createRoom}
        roomName={roomName}
        handleChangeRoomName={handleChangeRoomName}
        modalShow={modalShow}
        handleClickLink={handleModalOpen}
        handleModalClose={handleModalClose}
      />
    </TransitionMotion>
  );
}
